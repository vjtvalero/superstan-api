import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Entity()
export class Account {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ default: '', unique: true })
    email: string;

    @Column({ default: '' })
    password: string;

    @Column({ default: '' })
    verify_code: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    last_login: string;

    @Column({ type: 'tinyint', default: 0 })
    status: number;

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
        this.verify_code = uuid();
    }
}
