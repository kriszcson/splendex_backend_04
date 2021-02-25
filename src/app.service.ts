import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
