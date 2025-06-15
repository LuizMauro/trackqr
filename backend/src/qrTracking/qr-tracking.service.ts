import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrTracking } from './qr-tracking.entity';

@Injectable()
export class QrTrackingService {
  constructor(
    @InjectRepository(QrTracking)
    private readonly qrTrackingRepo: Repository<QrTracking>,
  ) {}

  async createQrTracking(data: QrTracking) {
    const qrTrackingCreated = this.qrTrackingRepo.create(data);
    return this.qrTrackingRepo.save(qrTrackingCreated);
  }

  async findByQrCode(qrCodeId: string) {
    return this.qrTrackingRepo.find({
      where: { qrCode: { id: qrCodeId } },
      order: { viewedAt: 'DESC' },
    });
  }

  async countByQrCode(qrCodeId: string): Promise<number> {
    return this.qrTrackingRepo.count({
      where: { qrCode: { id: qrCodeId } },
    });
  }
}
