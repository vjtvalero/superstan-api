import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from 'src/account/account.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const account = await this.accountService.findOne(email);
        if (account && await this.compareHash(password, account.password)) {
            const { password, ...result } = account;
            return result;
        }
        return null;
    }

    async login(account: any) {
        const payload = { email: account.email, sub: account.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
