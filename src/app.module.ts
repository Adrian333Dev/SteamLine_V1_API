import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { PrismaModule } from '@/modules';
import { UserModule, OrganizationModule } from '@/resources';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { numberScalarMode: 'integer' },
    }),
    PrismaModule,
    UserModule,
    OrganizationModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
