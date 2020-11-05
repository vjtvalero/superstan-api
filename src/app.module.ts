import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import env from 'config/env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Account } from './account/account.entity';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [env]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('database.host'),
                port: +configService.get<number>('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.dbname'),
                entities: [Account],
                synchronize: true,
            }),
            inject: [ConfigService]
        }),
        AccountModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private connection: Connection) { }
}
