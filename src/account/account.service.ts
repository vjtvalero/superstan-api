import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './account.dto';
import { Account } from './account.entity';
import * as crypto from 'crypto';

export const TOKEN_SPLITTER = '--verify--';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        private mailService: MailService
    ) { }

    findOne(email: string): Promise<Account> {
        return this.accountRepository.findOne({ email });
    }

    async create(accountDetails: CreateAccountDto): Promise<Account> {
        const newAccount = this.accountRepository.create(accountDetails);
        const { email, verify_code } = await this.accountRepository.save(newAccount);
        const emailHash = crypto.createHash('md5').update(email).digest('hex');
        await this.mailService.sendVerification(email, `${emailHash}${TOKEN_SPLITTER}${verify_code}`);
        return newAccount;
    }

    async verify(emailHash: string, verify_code: string): Promise<boolean> {
        const { email } = await this.accountRepository.findOne({ verify_code }) || {};
        if (email && crypto.createHash('md5').update(email).digest('hex') === emailHash) {
            await this.accountRepository.update({ email }, { status: 1, verify_code: '' });
            return true;
        }
        return false;
    }
}
