import { InMemoryStatementsRepository } from "../../statements/repositories/in-memory/InMemoryStatementsRepository";
import { OperationType } from "../../statements/useCases/createStatement/CreateStatementController";
import { CreateStatementUseCase } from "../../statements/useCases/createStatement/CreateStatementUseCase";
import { InMemoryUsersRepository } from "../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../users/useCases/createUser/ICreateUserDTO";
import { InMemoryTransfer } from "../repositories/in-memory/InMemoryTranfer";
import { CreateTransfersUseCase } from "./CreateTransfersUseCase";
import { ICreateTransferDTO } from "./ICreateTransferDTO";

let inMemoryUserRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let inMemoryTranfersRepository: InMemoryTransfer;
let createTranfersUseCase: CreateTransfersUseCase;
let inMemoryStatementRepository: InMemoryStatementsRepository;
let createStatemenUseCase: CreateStatementUseCase;

describe('create tranfers', () => {
  beforeEach(() => {

    inMemoryUserRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);

    inMemoryStatementRepository = new InMemoryStatementsRepository();
    createStatemenUseCase = new CreateStatementUseCase(inMemoryUserRepository,inMemoryStatementRepository);

    inMemoryTranfersRepository = new InMemoryTransfer();
    createTranfersUseCase = new CreateTransfersUseCase(inMemoryStatementRepository,inMemoryTranfersRepository, inMemoryUserRepository);
  });

  it('and possible that a registered user can make a transfer', async () => {
    const user: ICreateUserDTO = {
      name: 'jonathan',
      email: 'jonathanvni@gmail.com',
      password: '2121'
    }

    const user2: ICreateUserDTO = {
      name: 'jonathan2',
      email: 'jonathanvni2@gmail.com',
      password: '21217'
    }

    const user_id = <string>(await createUserUseCase.execute(user)).id;
    const sender_id = <string>(await createUserUseCase.execute(user2)).id;

    await createStatemenUseCase.execute({
      user_id,
      type: 'deposit' as OperationType,
      amount: 900,
      description: 'deposito',
    });

    const tranfer = await createTranfersUseCase.execute({
      sender_id,
      amount: 100,
      description: 'Tranferir para o jonathan'
    })

    console.log(tranfer);

  });
})
