import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Index({ unique: true }) // optional: wenn E-Mail eindeutig sein soll
  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string | null; // <-- expliziter Typ + nullable

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'simple-array', default: '' })
  roles: string[]; // z. B. ['user']

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
