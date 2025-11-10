import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('quote') // exakt die existierende Tabelle
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  // DB-Spalte heißt 'text' -> mappe sie auf die Property 'quote'
  @Column({ name: 'quote', length: 500, nullable: false })
  quote: string;

  @Column({ name: 'author', nullable: true })
  author?: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
