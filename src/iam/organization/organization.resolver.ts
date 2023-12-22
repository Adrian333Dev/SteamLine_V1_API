import { Resolver } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { IBaseResourceResolver } from '@/common/interfaces';
import { CreateOrganizationInput, UpdateOrganizationInput } from './dto';
import { Organization } from './entities';

@Resolver(() => Organization)
export class OrganizationResolver
  implements
    IBaseResourceResolver<
      Organization,
      CreateOrganizationInput,
      UpdateOrganizationInput
    >
{
  constructor(private readonly organizationService: OrganizationService) {}

  list() {
    return this.organizationService.list();
  }

  get(id: number) {
    return this.organizationService.get(id);
  }

  create(data: CreateOrganizationInput) {
    return this.organizationService.create(data);
  }

  update(id: number, data: UpdateOrganizationInput) {
    return this.organizationService.update(id, data);
  }

  delete(id: number) {
    return this.organizationService.delete(id);
  }
}
