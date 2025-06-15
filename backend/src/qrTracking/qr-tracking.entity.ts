import { QrCode } from 'src/qr/qr.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class QrTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => QrCode, (qr) => qr.trackings, { onDelete: 'CASCADE' })
  qrCode: QrCode;

  @Column()
  ip?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ nullable: true })
  referer?: string;

  @Column({ nullable: true })
  location?: string;

  @CreateDateColumn()
  viewedAt: Date;
}
