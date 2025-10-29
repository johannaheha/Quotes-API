import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    await this.ensureUnique(dto.username, dto.email);
    const entity = this.userRepository.create({
      ...dto,
      roles: dto.roles?.length ? dto.roles : ['user'],
      password: await bcrypt.hash(dto.password, 10),
    });
    return this.userRepository.save(entity);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number) {
    return this.findOne(id);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // unique checks nur, wenn Felder geändert werden
    if (dto.username && dto.username !== user.username) {
      await this.ensureUnique(dto.username, undefined);
    }
    if (dto.email && dto.email !== user.email) {
      await this.ensureUnique(undefined, dto.email);
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return user;
  }

  private async ensureUnique(username?: string, email?: string) {
    if (username) {
      const exists = await this.userRepository.findOne({ where: { username } });
      if (exists) throw new ConflictException('Username already in use');
    }
    if (email) {
      const exists = await this.userRepository.findOne({ where: { email } });
      if (exists) throw new ConflictException('Email already in use');
    }
  }
}
