import { ETodoStatus } from 'src/enums/todo.enum';
import { DefaultBaseEntity } from 'src/shared/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('todo')
export class TodoEntity extends DefaultBaseEntity {
  @Column({ nullable: false })
  task: string;

  @Column({
    type: 'enum',
    enum: ETodoStatus,
    default: ETodoStatus.TODO,
    nullable: false,
  })
  status: ETodoStatus;
}
