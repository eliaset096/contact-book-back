import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  async healthCheck(): Promise<string> {
    return 'API is running...';
  }


}
