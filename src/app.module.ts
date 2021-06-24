import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/database';
import { UserModule } from './user/user.module';
import { CafeModule } from './cafe/cafe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    CafeModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
