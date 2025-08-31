import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getHello(): string {
    return 'API is running 🚀';
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
