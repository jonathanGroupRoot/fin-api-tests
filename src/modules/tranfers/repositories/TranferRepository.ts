import { getRepository, Repository } from "typeorm";
import { Transfer } from "../entities/Transfer";
import { ICreateTransferDTO } from "../useCases/ICreateTransferDTO";
import { ITransfer } from "./ITranfer";

export class TransferRepository implements ITransfer {
  private repository: Repository<Transfer>

  constructor() {
    this.repository = getRepository(Transfer);
  }

  async create({amount, description}: ICreateTransferDTO):  Promise<Transfer> {
    const tranfer = this.repository.create({
      amount,
      description,
    })

    return this.repository.save(tranfer);

  }

}
