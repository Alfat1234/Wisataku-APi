import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';

@ApiTags('destinasi')
@Controller('destinasi')
export class DestinasiController {
  // 1. GET /destinasi (Mengambil semua destinasi)
  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua daftar destinasi wisata' })
  @ApiResponse({ status: 200, description: 'Berhasil mengambil daftar destinasi.' })
  findAll() {
    return [
      {
        id: 1,
        nama: 'Candi Borobudur',
        lokasi: 'Magelang, Jawa Tengah',
        deskripsi: 'Candi Buddha terbesar di dunia.',
        hargaTiket: 50000,
      },
      {
        id: 2,
        nama: 'Pantai Kuta',
        lokasi: 'Badung, Bali',
        deskripsi: 'Pantai terkenal dengan sunset.',
        hargaTiket: 0,
      },
    ];
  }

  // 2. GET /destinasi/:id (Mengambil detail destinasi berdasarkan ID)
  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail destinasi berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Detail destinasi ditemukan.' })
  @ApiResponse({ status: 404, description: 'Destinasi tidak ditemukan.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
      nama: 'Candi Borobudur',
      lokasi: 'Magelang, Jawa Tengah',
      deskripsi: 'Candi Buddha terbesar di dunia.',
      hargaTiket: 50000,
    };
  }

  // 3. POST /destinasi (Menambah destinasi baru)
  @Post()
  @ApiOperation({ summary: 'Menambahkan destinasi wisata baru' })
  @ApiResponse({ status: 201, description: 'Destinasi berhasil dibuat.' })
  @ApiResponse({ status: 400, description: 'Input data tidak valid.' })
  create(@Body() createDestinasiDto: CreateDestinasiDto) {
    return {
      message: 'Destinasi berhasil ditambahkan',
      data: {
        id: Date.now(),
        ...createDestinasiDto,
      },
    };
  }

  // 4. PATCH /destinasi/:id (Memperbarui data destinasi)
  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui data destinasi berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Destinasi berhasil diperbarui.' })
  @ApiResponse({ status: 404, description: 'Destinasi tidak ditemukan.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDestinasiDto: UpdateDestinasiDto,
  ) {
    return {
      message: `Destinasi dengan ID ${id} berhasil diperbarui`,
      data: updateDestinasiDto,
    };
  }

  // 5. DELETE /destinasi/:id (Menghapus destinasi)
  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus destinasi berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Destinasi berhasil dihapus.' })
  @ApiResponse({ status: 404, description: 'Destinasi tidak ditemukan.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `Destinasi dengan ID ${id} berhasil dihapus`,
    };
  }
}