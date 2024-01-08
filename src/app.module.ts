import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'steam_line_db',
    }),
    ,
    UserModule,
  ],
})
export class AppModule {}
