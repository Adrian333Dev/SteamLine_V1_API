export interface Resource<T> {
  list(): Promise<T[]>;
  get(id: number): Promise<T>;
  create(data: any): Promise<T>;
  update(id: number, data: any): Promise<T>;
  delete(id: number): Promise<T>;
}
