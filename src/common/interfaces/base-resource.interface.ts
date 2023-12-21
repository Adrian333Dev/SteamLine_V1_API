import { IdType } from '../types';

interface IBaseResource {
  id: IdType;
}

type GQLResponse<Model> = Partial<Model>;

export interface IBaseResourceService<
  Model extends IBaseResource,
  CreateInput extends Partial<Omit<Model, 'id'>>,
  UpdateInput extends Partial<CreateInput>,
> {
  list(): Promise<GQLResponse<Model>[]>;
  get(id: IdType): Promise<GQLResponse<Model>>;
  create(data: CreateInput): Promise<GQLResponse<Model>>;
  update(id: IdType, data: UpdateInput): Promise<GQLResponse<Model>>;
  delete(id: IdType): Promise<GQLResponse<Model>>;
}

export interface IBaseResourceResolver<
  Model extends IBaseResource,
  CreateInput extends Partial<Omit<Model, 'id'>>,
  UpdateInput extends Partial<CreateInput>,
> {
  list(): Promise<GQLResponse<Model>[]>;
  get(id: IdType): Promise<GQLResponse<Model>>;
  create(data: CreateInput): Promise<GQLResponse<Model>>;
  update(id: IdType, data: UpdateInput): Promise<GQLResponse<Model>>;
  delete(id: IdType): Promise<GQLResponse<Model>>;
}
