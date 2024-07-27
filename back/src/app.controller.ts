import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'hola mundo';
  }

  @Get('hola2')
  getHello2(): string {
    return 'hola mundo 2';
  }
}
