import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { AccountController } from './account.controller';
import { Account } from './account.entity';
import { AccountService } from './account.service';

@Module({
    controllers: [AccountController],
    providers: [AccountService, MailService],
    imports: [TypeOrmModule.forFeature([Account])],
    exports: [AccountService]
})
export class AccountModule {

}
