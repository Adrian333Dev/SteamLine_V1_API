import { IBaseResourceService } from '@/common/interfaces';
import { PrismaService } from '@/modules/prisma';
import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import {
  CreateOrganizationInput,
  UpdateOrganizationInput,
} from './organization.inputs';

@Injectable()
export class OrganizationService
  implements
    IBaseResourceService<
      Organization,
      CreateOrganizationInput,
      UpdateOrganizationInput
    >
{
  constructor(private readonly prismaService: PrismaService) {}

  list() {
    return this.prismaService.organization.findMany();
  }

  get(id: number) {
    return this.prismaService.organization.findUnique({ where: { id } });
  }

  create(data: CreateOrganizationInput) {
    // TODO: Get the current user from the context
    return this.prismaService.organization.create({
      data: { ...data, createdBy: null },
    });
  }

  update(id: number, data: UpdateOrganizationInput) {
    return this.prismaService.organization.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prismaService.organization.delete({ where: { id } });
  }
}
