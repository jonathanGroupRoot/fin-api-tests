import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../users/entities/User";

@Entity('transfers')
export class Transfer {
  @PrimaryColumn()
  id: string

  @OneToOne(() => User, user => user.transfers)
  @JoinColumn({ name: 'sender_id' })
  user: User;

  sender_id: string

  @Column()
  amount: string

  @Column()
  description: string

  constructor() {
    if(!this.id) {
      this.id === uuidV4();
    }
  }
}
