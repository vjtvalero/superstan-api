import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './account.dto';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) { }

    findOne(email: string): Promise<Account> {
        return this.accountRepository.findOne({ email });
    }

    async create(accountDetails: CreateAccountDto): Promise<Account> {
        const newAccount = this.accountRepository.create(accountDetails);
        await this.accountRepository.save(newAccount);
        return newAccount;
    }
}
