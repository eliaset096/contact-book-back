import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envLoaderConfig } from './infrastructure/config/env-loader.config';
import { envValidationSchema } from './infrastructure/config/env-validation-schema.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envLoaderConfig],
      validationSchema: envValidationSchema,

    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
