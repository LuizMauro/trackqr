import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { QrTracking } from 'src/qrTracking/qr-tracking.entity';

@Entity()
export class QrCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string; // usado na URL: /q/:slug

  @Column()
  targetUrl: string;

  @Column({ nullable: true })
  title?: string;

  @Column('json', { nullable: true })
  style?: {
    fgColor?: string;
    bgColor?: string;
    logoUrl?: string;
  };

  @OneToMany(() => QrTracking, (tracking) => tracking.qrCode)
  trackings: QrTracking[];

  @Column({ nullable: true })
  createdBy?: string; // para quando tiver autenticação

  @CreateDateColumn()
  createdAt: Date;
}
