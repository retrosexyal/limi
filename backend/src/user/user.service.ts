import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from '../../shared/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create({ name, email }: UserDto) {
    const user = this.userRepository.create({ name, email });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }
}
