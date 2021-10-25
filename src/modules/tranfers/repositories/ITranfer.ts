import { Transfer } from "../entities/Transfer";
import { ICreateTransferDTO } from "../useCases/ICreateTransferDTO";

export interface ITransfer {
  create(data: ICreateTransferDTO): Promise<Transfer>;
}
