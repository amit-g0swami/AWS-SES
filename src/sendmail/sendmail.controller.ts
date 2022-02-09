/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { SendmailService } from './sendmail.service';

@Controller('sendmail')
export class SendmailController {
    constructor(private sendmailService: SendmailService) { }
    @Post()
    getMailModelData(@Body() req) {
        return this.sendmailService.mailSend("login", "hiiii", "subject", "dev2.seekamentor@gmail.com", "sam-email", "product.seekamentor@gmail.com")
    }
}
