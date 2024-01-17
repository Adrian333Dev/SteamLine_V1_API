import { ID } from '../types';
import { IQueryable, IMutationable, ICRUD } from './../interfaces';

export abstract class IQueryableService<T> implements IQueryable<T> {
  constructor(protected readonly repository: IQueryable<T>) {}

  async list(params: unknown): Promise<T[]> {
    return this.repository.list(params);
  }

  async get(data: T): Promise<T> {
    return this.repository.get(data);
  }
}

export abstract class IMutationableService<T> implements IMutationable<T> {
  constructor(protected readonly repository: IMutationable<T>) {}

  async create(data: T): Promise<T> {
    return this.repository.create(data);
  }

  async update(data: T): Promise<T> {
    return this.repository.update(data);
  }

  async delete(data: T): Promise<T> {
    return this.repository.delete(data);
  }
}

export abstract class ICRUDService<T> implements ICRUD<T> {
  constructor(protected readonly repository: ICRUD<T>) {}

  async create(data: T): Promise<T> {
    return this.repository.create(data);
  }

  async update(data: T): Promise<T> {
    return this.repository.update(data);
  }

  async delete(data: T): Promise<T> {
    return this.repository.delete(data);
  }

  async list(params: unknown): Promise<T[]> {
    return this.repository.list(params);
  }

  async get(data: T): Promise<T> {
    return this.repository.get(data);
  }
}
