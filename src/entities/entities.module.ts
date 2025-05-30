import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/todo.entity';
import { TodoRepository } from './todo/todo.repository';

const Entitys = [TodoEntity];
const Repositorys = [TodoRepository];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([...Entitys])],
  providers: [...Repositorys],
  exports: [...Repositorys],
})
export class EntitiesModule {}
