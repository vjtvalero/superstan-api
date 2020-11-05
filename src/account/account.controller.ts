import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
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
            return { message: 'Account created successfully' };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new HttpException('Email already exists.', HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Get('verify')
    verify(@Body() body): string {
        return 'verify your account here';
    }

    @UseGuards(JwtAuthGuard)
    @Get('find/:email')
    async findOne(@Param() params: { email: string; }): Promise<Account> {
        return await this.service.findOne(params.email);
    }
}
