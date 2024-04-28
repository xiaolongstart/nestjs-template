import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ResponseInterceptor } from 'src/response/response.interceptor';
import { ResponseFilter } from 'src/response/response.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.enableCors();
    app.useGlobalInterceptors(new ResponseInterceptor);
    app.useGlobalFilters(new ResponseFilter);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(configService.get('PORT') ?? 3000);
}

bootstrap();