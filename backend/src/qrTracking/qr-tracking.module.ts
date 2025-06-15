import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QrTracking } from './qr-tracking.entity';
import { QrTrackingService } from './qr-tracking.service';

@Module({
  imports: [TypeOrmModule.forFeature([QrTracking])],
  providers: [QrTrackingService],
  exports: [QrTrackingService],
})
export class QrTrackingModule {}
