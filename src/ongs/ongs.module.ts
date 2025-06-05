import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OngsService } from './ongs.service';
import { OngsController } from './ongs.controller';
import { Ong } from './ongs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ong])],
  controllers: [OngsController],
  providers: [OngsService],
})
export class OngsModule {}