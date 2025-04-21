import { Injectable } from '@nestjs/common';
import { Example } from './example.entity';

@Injectable()
export class ExampleService {
  getData(): Example {
    return { id: 1, name: 'Привет с сервера!' };
  }
}
