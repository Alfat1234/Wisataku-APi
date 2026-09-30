import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Patch, 
  Delete, 
  NotFoundException, 
  ParseIntPipe 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiCreatedResponse, 
  ApiOkResponse, 
  ApiNotFoundResponse 
} from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDestinasiDto } from './dto/create-destinasi.dto';
import { UpdateDestinasiDto } from './dto/update-destinasi.dto';

@ApiTags('destinasi')
@Controller('destinasi')
export class DestinasiController {
  constructor(private readonly prisma: PrismaService) {}

  // 1. CREATE (POST) -> Status 201 dengan contoh DTO
  @Post()
  @ApiOperation({ summary: 'Tambah destinasi baru' })
  @ApiCreatedResponse({ 
    description: 'Destinasi berhasil dibuat.',
    type: CreateDestinasiDto,
  })
  async create(@Body() createDto: CreateDestinasiDto) {
    return this.prisma.destinasi.create({
      data: createDto,
    });
  }

  // 2. READ ALL (GET) -> Status 200 dengan array DTO
  @Get()
  @ApiOperation({ summary: 'Ambil semua destinasi' })
  @ApiOkResponse({ 
    description: 'Daftar destinasi berhasil diambil.',
    type: [CreateDestinasiDto],
  })
  async findAll() {
    return this.prisma.destinasi.findMany();
  }

  // 3. READ DETAIL (GET :id) -> Status 200 / 404
  @Get(':id')
  @ApiOperation({ summary: 'Ambil detail destinasi berdasarkan ID' })
  @ApiOkResponse({ 
    description: 'Detail destinasi ditemukan.',
    type: CreateDestinasiDto,
  })
  @ApiNotFoundResponse({ description: 'Destinasi tidak ditemukan.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const destinasi = await this.prisma.destinasi.findUnique({
      where: { id },
    });

    if (!destinasi) {
      throw new NotFoundException(`Destinasi dengan ID ${id} tidak ditemukan`);
    }

    return destinasi;
  }

  // 4. READ ULASAN BY DESTINASI (GET :id/ulasan) -> Status 200 / 404
  @Get(':id/ulasan')
  @ApiOperation({ summary: 'Ambil semua ulasan berdasarkan ID destinasi' })
  @ApiOkResponse({ 
    description: 'Daftar ulasan berhasil diambil.',
  })
  @ApiNotFoundResponse({ description: 'Destinasi tidak ditemukan.' })
  async findUlasanByDestinasi(@Param('id', ParseIntPipe) id: number) {
    // Validasi keberadaan destinasi
    await this.findOne(id);

    return this.prisma.ulasan.findMany({
      where: { destinasiId: id },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 5. UPDATE PARTIAL (PATCH) -> Status 200 / 404
  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui sebagian data destinasi berdasarkan ID' })
  @ApiOkResponse({ 
    description: 'Destinasi berhasil diperbarui.',
    type: CreateDestinasiDto,
  })
  @ApiNotFoundResponse({ description: 'Destinasi tidak ditemukan.' })
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDto: UpdateDestinasiDto,
  ) {
    await this.findOne(id);

    return this.prisma.destinasi.update({
      where: { id },
      data: updateDto,
    });
  }

  // 6. DELETE (DELETE :id) -> Status 200 / 404
  @Delete(':id')
  @ApiOperation({ summary: 'Hapus destinasi berdasarkan ID' })
  @ApiOkResponse({ 
    description: 'Destinasi berhasil dihapus.',
    type: CreateDestinasiDto,
  })
  @ApiNotFoundResponse({ description: 'Destinasi tidak ditemukan.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.findOne(id);

    return this.prisma.destinasi.delete({
      where: { id },
    });
  }
}