import { Transfer } from "../../entities/Transfer";
import { ICreateTransferDTO } from "../../useCases/ICreateTransferDTO";
import { ITransfer } from "../ITranfer";

export class InMemoryTransfer implements ITransfer {
  private transfers: Transfer[] = [];
  async create({amount, description}: ICreateTransferDTO):  Promise<Transfer> {
    const tranfer = new Transfer();

    Object.assign(tranfer, {
      amount,
      description
    });

    this.transfers.push(tranfer);

    return tranfer;

  }

}
