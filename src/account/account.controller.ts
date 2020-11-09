import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AccountService, TOKEN_SPLITTER } from './account.service';
import { CreateAccountDto } from './account.dto';
import { Account } from './account.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('account')
export class AccountController {
    constructor(private readonly service: AccountService) { }

    @Post('new')
    async create(@Body() createAccountDto: CreateAccountDto): Promise<{ message: string; }> {
        try {
            await this.service.create(createAccountDto);
            return { message: 'Hooray! Your account has been successfully created. Please confirm your email.' };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new HttpException('Email is already used.', HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Get('verify/:token')
    async verify(@Param() params: { token: string; }): Promise<{ message: string; }> {
        const tokenParts = params.token.split(TOKEN_SPLITTER);
        if (tokenParts.length !== 2) {
            throw new HttpException('Invalid verification token.', HttpStatus.BAD_REQUEST);
        }
        const [emailHash, verifyCode] = tokenParts;
        const isVerified = await this.service.verify(emailHash, verifyCode);
        if (!isVerified) {
            throw new HttpException('Invalid verification token.', HttpStatus.BAD_REQUEST);
        }
        return { message: 'Your account has been confirmed! You may login now using your email and password.' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('find/:email')
    async findOne(@Param() params: { email: string; }): Promise<Account> {
        return await this.service.findOne(params.email);
    }
}
