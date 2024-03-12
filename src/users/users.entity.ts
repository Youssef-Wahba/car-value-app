import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  @AfterInsert()
  logUserInsert() {
    console.log(`User inserted with id: ${this.id}`);
  }

  @AfterUpdate()
  logUserUpdate() {
    console.log(`User updated with id: ${this.id}\n${this}`);
  }
  @AfterRemove()
  logUserRemove() {
    console.log(`User removed with id: ${this.id}\n${this}`);
  }
}
