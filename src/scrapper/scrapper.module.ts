import { Module } from '@nestjs/common';
import { ScrapperController } from './scrapper.controller';
import { ScrapperService } from './scrapper.service';

@Module({
  controllers: [ScrapperController],
  providers: [ScrapperService],
})
export class ScrapperModule {}
