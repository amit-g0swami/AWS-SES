import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendmailModule } from './sendmail/sendmail.module';

@Module({
  imports: [SendmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
