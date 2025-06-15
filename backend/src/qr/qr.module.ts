import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrService } from './qr.service';
import { QrController } from './qr.controller';
import { QrCode } from './qr.entity';
import { QrTrackingModule } from 'src/qrTracking/qr-tracking.module';

@Module({
  imports: [TypeOrmModule.forFeature([QrCode]), QrTrackingModule],
  controllers: [QrController],
  providers: [QrService],
})
export class QrModule {}
