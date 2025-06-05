import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  mission: string;

  @Column('simple-array')
  causes: string[];

  @Column({ nullable: true })
  website?: string;

  @Column()
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}