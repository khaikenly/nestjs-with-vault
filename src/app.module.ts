import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VaultModule } from '@app/infra';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VaultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
