import { inject, injectable } from "tsyringe";
import { IStatementsRepository } from "../../statements/repositories/IStatementsRepository";
import { CreateStatementError } from "../../statements/useCases/createStatement/CreateStatementError";
import { IUsersRepository } from "../../users/repositories/IUsersRepository";
import { CreateUserError } from "../../users/useCases/createUser/CreateUserError";
import { ITransfer } from "../repositories/ITranfer";
import { ICreateTransferDTO } from "./ICreateTransferDTO";

@injectable()
export class CreateTransfersUseCase {
  constructor(
    @inject('StatementsRepository')
    private statementRepository: IStatementsRepository,

    @inject('TransferRepository')
    private createTransfers: ITransfer,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ sender_id, amount, description }: ICreateTransferDTO) {
    const userFind = this.usersRepository.findById(sender_id);

    if(!userFind) {
      throw new CreateStatementError.UserNotFound();
    }

    await this.createTransfers.create({ sender_id, amount, description});
  }
}
