import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QrCode } from './qr.entity';
import { nanoid } from 'nanoid';
import { QrTrackingService } from 'src/qrTracking/qr-tracking.service';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class QrService {
  constructor(
    @InjectRepository(QrCode)
    private qrRepository: Repository<QrCode>,
    private qrTrackingService: QrTrackingService,
  ) {}

  async createQrCode(data: { targetUrl: string; title?: string }) {
    const slug = nanoid(6); // ou sua função de slug

    const qr = this.qrRepository.create({ ...data, slug });
    return this.qrRepository.save(qr);
  }

  async getAllQrCodes() {
    return this.qrRepository.find({ order: { createdAt: 'DESC' } });
  }

  async getBySlug(slug: string) {
    return this.qrRepository.findOne({ where: { slug } });
  }

  async trackVisit(
    qrId: string,
    data: { ip: string; userAgent?: string; referer?: string },
  ) {
    const qrCode = await this.qrRepository.findOne({ where: { id: qrId } });
    if (!qrCode) throw new NotFoundException('QrCode not Found');

    return this.qrTrackingService.createQrTracking({
      id: uuidV4(),
      qrCode,
      viewedAt: new Date(),
      ...data,
    });
  }
}
