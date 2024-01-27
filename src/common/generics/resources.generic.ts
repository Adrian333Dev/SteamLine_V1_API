export interface IListable<T> {
  list(params: unknown): Promise<T[]>;
}

export interface IGettable<T> {
  get(params: unknown): Promise<T | null>;
}

export interface IQueryable<T> extends IListable<T>, IGettable<T> {}

export interface ICreateable<T> {
  create(params: unknown): Promise<T>;
}

export interface IUpdateable<T> {
  update(params: unknown): Promise<T>;
}

export interface IDeleteable<T> {
  delete(params: unknown): Promise<T>;
}

export interface IMutationable<T>
  extends ICreateable<T>,
    IUpdateable<T>,
    IDeleteable<T> {}

export interface ICRUD<T> extends IQueryable<T>, IMutationable<T> {}

// Repo Only

export interface IGettableNonNullable<T> {
  findUniqueOrThrow(params: unknown): Promise<T>;
}

export interface ISaveable<T> {
  save(data: T): Promise<T>;
}