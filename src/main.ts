import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs'; // Import module fs Node.js

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aktifkan validasi DTO secara global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Konfigurasi Swagger
  const config = new DocumentBuilder()
    .setTitle('Wisataku API')
    .setDescription('Dokumentasi API untuk Manajemen Destinasi Wisata')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Langkah 5: Ekspor dokumen OpenAPI ke file openapi.json
  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
  console.log('Swagger UI available at http://localhost:3000/api/docs');
  console.log('File openapi.json telah berhasil diekspor di root proyek.');
}
bootstrap();