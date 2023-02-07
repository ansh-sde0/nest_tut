import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            username: 'ansh',
            password: 'Ansh2222',
            database: 'mongodb_tut',
            entities: [],
            synchronize: true,
        }),
    ],
})

export class DatabaseModule {}
