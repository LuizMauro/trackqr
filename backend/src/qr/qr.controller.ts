import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { QrService } from './qr.service';
import { Response, Request } from 'express';

@Controller()
export class QrController {
  constructor(private readonly qrCodeService: QrService) {}

  @Post('qr')
  async create(@Body() body: { targetUrl: string; title?: string }) {
    return this.qrCodeService.createQrCode(body);
  }

  @Get('qr')
  async findAll() {
    return this.qrCodeService.getAllQrCodes();
  }

  @Get('qr/:slug')
  async findOne(@Param('slug') slug: string) {
    const qr = await this.qrCodeService.getBySlug(slug);
    if (!qr) throw new NotFoundException('QR Code not found');
    return qr;
  }

  @Get('q/:slug')
  async redirectAndTrack(
    @Param('slug') slug: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const qr = await this.qrCodeService.getBySlug(slug);
    if (!qr) throw new NotFoundException('QR Code not found');

    await this.qrCodeService.trackVisit(qr.id, {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      referer: req.headers['referer'],
    });

    return res.redirect(qr.targetUrl);
  }
}
