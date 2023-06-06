import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GtsController } from './gts.controller';
import { GtsService } from './gts.service';
import { GtsEntity } from './gts.entity';

@Module({
  controllers: [GtsController],
  providers: [GtsService],
  exports: [GtsService],
  imports: [TypeOrmModule.forFeature([GtsEntity])],
})
export class GtsModule {}
