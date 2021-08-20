import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [ScrapperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
