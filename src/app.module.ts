import { Module } from '@nestjs/common';
import { DestinasiModule } from './destinasi/destinasi.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DestinasiModule, PrismaModule],
})
export class AppModule {}