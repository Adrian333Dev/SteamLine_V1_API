import * as Mustache from 'mustache';

import { PrismaClient, User } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { map, size } from 'lodash';

import {
  subject,
  RawRuleOf,
  MongoAbility,
  ForcedSubject,
  ForbiddenError,
  createMongoAbility,
} from '@casl/ability';

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@modules/prisma';
import { CHECK_ABILITY, RequiredRule } from '../decorators';
import { Request } from 'express';

export const actions = [
  'read',
  'manage',
  'create',
  'update',
  'delete',
] as const;

export const subjects = [
  'User',
  'Workspace',
  'Board',
  'List',
  'Card',
  'all',
] as const;

export type Abilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
];

export type AppAbility = MongoAbility<Abilities>;

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService
  ) {}

  createAbility = (rules: RawRuleOf<AppAbility>[]) =>
    createMongoAbility<AppAbility>(rules);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules: any =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];
    const currUser: User = context.switchToHttp().getRequest().user;
    const request: Request = context.switchToHttp().getRequest();

    const userPermissions = await this.prisma.permission.findMany({
      where: { roleId: currUser.roleId },
    });

    const parsedUserPermissions = this.parseCondition(
      userPermissions,
      currUser
    );

    try {
      const ability = this.createAbility(Object(parsedUserPermissions));

      for await (const rule of rules) {
        let sub = {};
        if (size(rule?.conditions)) {
          const subId = +request.params['id'];
          sub = await this.getSubjectById(subId, rule.subject);
        }

        ForbiddenError.from(ability)
          .setMessage('You are not allowed to perform this action')
          .throwUnlessCan(rule.action, subject(rule.subject, sub));
      }
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
      throw error;
    }
  }

  parseCondition(permissions: any, currentUser: User) {
    const data = map(permissions, (permission) => {
      if (size(permission.conditions)) {
        const parsedVal = Mustache.render(
          permission.conditions['created_by'],
          currentUser
        );
        return {
          ...permission,
          conditions: { created_by: +parsedVal },
        };
      }
      return permission;
    });
    return data;
  }

  async getSubjectById(id: number, subName: keyof PrismaClient) {
    const subject = await (this.prisma[subName] as any).findFirst({
      where: { id },
    });
    if (!subject) throw new NotFoundException(`${subName as string} not found`);
    return subject;
  }
}
