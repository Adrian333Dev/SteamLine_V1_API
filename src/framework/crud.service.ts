import { Injectable } from '@nestjs/common';
import { Model, Types, Document } from 'mongoose';
import { PaginationQueryDto } from './dto';

@Injectable()
export abstract class CrudService<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(dto: Partial<T>): Promise<T> {
    const doc = new this.model(dto);
    return doc.save();
  }

  async findAll(): Promise<T[]>;
  async findAll(select: string): Promise<T[]>;
  async findAll(query: PaginationQueryDto): Promise<T[]>;
  async findAll(query: PaginationQueryDto, select: string): Promise<T[]>;
  async findAll(
    queryOrSelect?: PaginationQueryDto | string,
    select?: string,
  ): Promise<T[]> {
    if (typeof queryOrSelect === 'string')
      return this.model.find().select(queryOrSelect).exec();
    if (queryOrSelect instanceof PaginationQueryDto) {
      const { limit, offset } = queryOrSelect;
      return this.model.find().skip(offset).limit(limit).select(select).exec();
    }
    return this.model.find().exec();
  }

  async findOne(id: string, select?: string): Promise<T | null> {
    return this.model.findById(id).select(select).exec();
  }

  async update<UpdateDto extends Partial<T>>(
    id: string,
    dto: UpdateDto,
  ): Promise<T> {
    const existing = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!existing)
      throw new Error(`No ${this.model.modelName} found with id ${id}`);
    return existing;
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
