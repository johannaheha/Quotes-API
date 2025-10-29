import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Quote } from './src/quotes/entities/quotes.entity';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: 'dev.sqlite',
  entities: [User, Quote],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});
