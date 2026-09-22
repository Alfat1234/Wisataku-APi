import { Module } from '@nestjs/common';
import { DestinasiModule } from './destinasi/destinasi.module';

@Module({
  imports: [DestinasiModule],
})
export class AppModule {}