import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/users.entity'

@Module({
  imports: [UsersModule,TypeOrmModule.forRoot({
    type: 'mongodb',
    host: '127.0.0.1',
    port: 27017,
    username: '',
    password: '',
    database: 'mongodb_tut',
    useNewUrlParser:true,
    useUnifiedTopology:true,
    entities: [User],
    synchronize: true})],

  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
