import { DataSource, Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor(private dataSource: DataSource) {
    super(TodoEntity, dataSource.createEntityManager());
  }
}
