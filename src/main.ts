import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create App
  const app = await NestFactory.create(AppModule);

  // Globals Midlewares
  app.use(helmet());
  app.use(morgan('combined', { stream: winston.stream }));

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1');

  const configServie = app.get(ConfigService);
  const port = configServie.get('PORT');

  // Listen server
  await app
    .listen(port)
    .then(() => console.log(`server running on port ${port}`));
  await app
    .getUrl()
    .then((url) =>
      console.log(`verify server health on ${url}/api/v1/healthCheck`),
    );
}

// Start App
bootstrap();
