import { Controller, Get, Post, Body } from '@nestjs/common';
import { OngsService } from './ongs.service';
import { Ong } from './ongs.entity';

@Controller('ongs')
export class OngsController {
  constructor(private readonly ongsService: OngsService) {}

  @Post()
  async create(@Body() ongData: Partial<Ong>) {
    return this.ongsService.create(ongData);
  }

  @Get()
  async findAll() {
    return this.ongsService.findAll();
  }
}