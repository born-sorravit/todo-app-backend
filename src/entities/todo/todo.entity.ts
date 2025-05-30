import { DefaultBaseEntity } from 'src/shared/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('todo')
export class TodoEntity extends DefaultBaseEntity {
  @Column({ nullable: false })
  task: string;
}
