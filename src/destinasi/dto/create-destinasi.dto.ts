import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateDestinasiDto {
  @ApiProperty({ example: 'Pantai Kuta', description: 'Nama destinasi wisata' })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({ example: 'Badung, Bali', description: 'Lokasi destinasi' })
  @IsString()
  @IsNotEmpty()
  lokasi: string;

  @ApiProperty({ example: 'Pantai indah dengan pemandangan matahari terbenam.', required: false })
  @IsString()
  @IsOptional()
  deskripsi?: string;

  @ApiProperty({ example: 50000, description: 'Harga tiket masuk dalam Rupiah' })
  @IsNumber()
  @IsNotEmpty()
  hargaTiket: number;
}