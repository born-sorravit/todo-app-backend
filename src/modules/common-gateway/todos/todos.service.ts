import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { BaseService } from 'src/shared/services/base.service';
import { TodoRepository } from 'src/entities/todo/todo.repository';
import { ETodoStatus } from 'src/enums/todo.enum';

@Injectable()
export class TodosService extends BaseService {
  constructor(private readonly todoRepository: TodoRepository) {
    super();
  }
  async create(createTodoDto: CreateTodoDto) {
    try {
      const duplicateTask = await this.todoRepository.findOneBy({
        task: createTodoDto.task,
      });

      if (duplicateTask) {
        return this.error('Todo already exists', 400);
      }

      const todo = this.todoRepository.create(createTodoDto);
      await this.todoRepository.save(todo);
      return this.success(todo);
    } catch (error) {
      return this.error(error.message);
    }
  }

  async findAll() {
    try {
      const todos = await this.todoRepository
        .createQueryBuilder('todo')
        .select(['todo.id', 'todo.task', 'todo.status'])
        .getMany();

      if (!todos.length || todos.length === 0) {
        return this.error('No todos found', 404);
      }

      // Group by status
      const grouped = todos.reduce((acc, todo) => {
        if (!acc[todo.status.toLowerCase()]) {
          acc[todo.status.toLowerCase()] = [];
        }
        acc[todo.status.toLowerCase()].push(todo);
        return acc;
      }, {} as Record<string, typeof todos>);

      return this.success(grouped);
    } catch (error) {
      return this.error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const todo = await this.todoRepository
        .createQueryBuilder('todo')
        .select(['todo.id', 'todo.task', 'todo.status'])
        .where('todo.id = :id', { id })
        .getOne();
      return this.success(todo);
    } catch (error) {
      return this.error(error.message);
    }
  }

  async updateDone(id: string) {
    try {
      const todo = await this.findOne(id);

      if (todo.data.status === ETodoStatus.DONE) {
        return this.error('Cannot update todo. Status is already done', 400);
      }

      const updateTodo = await this.todoRepository
        .createQueryBuilder('todo')
        .update()
        .set({ status: ETodoStatus.DONE })
        .where('id = :id', { id })
        .execute();

      if (updateTodo.affected === 0) {
        return this.error('Todo not found', 404);
      }

      return this.success(todo.data);
    } catch (error) {
      return this.error(error.message);
    }
  }

  async updateDelete(id: string) {
    try {
      const todo = await this.findOne(id);

      if (todo.data.status === ETodoStatus.DELETE) {
        return this.error('Cannot update todo. Status is already deleted', 400);
      }

      const updateTodo = await this.todoRepository
        .createQueryBuilder('todo')
        .update()
        .set({ status: ETodoStatus.DELETE })
        .where('id = :id', { id })
        .execute();

      if (updateTodo.affected === 0) {
        return this.error('Todo not found', 404);
      }

      return this.success(todo.data);
    } catch (error) {
      return this.error(error.message);
    }
  }

  async remove(id: string) {
    try {
      const findTodo = await this.findOne(id);
      if (!findTodo.data) {
        return this.error('Todo not found', 404);
      }

      const todo = await this.todoRepository.softDelete(id);
      return this.success(todo);
    } catch (error) {
      return this.error(error.message);
    }
  }
}
