import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDestinasiDto {
  @ApiProperty({ example: 'Candi Borobudur' })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({ example: 'Budaya' })
  @IsString()
  @IsNotEmpty()
  kategori: string;

  @ApiPropertyOptional({ example: 'Magelang, Jawa Tengah' })
  @IsString()
  @IsOptional()
  lokasi?: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsNotEmpty()
  hargaTiket: number;
}