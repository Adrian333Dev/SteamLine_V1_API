export interface IQueryable<T> {
  list(params: unknown): Promise<T[]>;
  get(params: unknown): Promise<T | null>;
}

export interface IMutationable<T> {
  create(params: unknown): Promise<T>;
  update(params: unknown): Promise<T>;
  delete(params: unknown): Promise<T>;
}

export interface ICRUD<T> extends IQueryable<T>, IMutationable<T> {}