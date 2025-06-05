import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ong } from './ongs.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OngsService {
  constructor(
    @InjectRepository(Ong)
    private ongsRepository: Repository<Ong>,
  ) {}

  async create(ongData: Partial<Ong>): Promise<Ong> {
    const hashedPassword = await bcrypt.hash(ongData.password, 10);
    const ong = this.ongsRepository.create({
      ...ongData,
      password: hashedPassword,
    });
    return this.ongsRepository.save(ong);
  }

  async findAll(): Promise<Ong[]> {
    return this.ongsRepository.find();
  }
}