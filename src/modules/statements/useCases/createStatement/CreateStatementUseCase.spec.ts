import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { OperationType } from './CreateStatementController';
import { CreateStatementError } from "./CreateStatementError";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";

let inMemoryUserRepository: InMemoryUsersRepository;
let inMemoryStatementRepository: InMemoryStatementsRepository;
let creteUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe('create statement', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    inMemoryStatementRepository = new InMemoryStatementsRepository();

    creteUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUserRepository, inMemoryStatementRepository);
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementRepository, inMemoryUserRepository);
  });

  it('should be able create statement', async () => {
    const user: ICreateUserDTO = {
      name: 'rootJonathan',
      email: 'jonathanVinicius',
      password: '2121',
    }

    const user_id = <string>(await creteUserUseCase.execute(user)).id;

    const createStatement = await createStatementUseCase.execute({
      user_id,
      type: 'deposit' as OperationType,
      amount: 12,
      description: 'teste amount',
    });

    expect(createStatement).toHaveProperty('id');
    expect(createStatement).toHaveProperty('user_id');
  });

  it('should not be able to create claim case if user does not exist', async () => {
    await expect(
      createStatementUseCase.execute({
        user_id: 'fake_id',
        type: 'deposit' as OperationType,
        amount: 12,
        description: 'teste amount',
      })
    ).rejects.toEqual(new CreateStatementError.UserNotFound());
  });

  it('should be able user withdraw money', async () => {
    const user: ICreateUserDTO = {
      name: 'jonathanMoney',
      email: 'mail@gmail.com',
      password: '22323',
    }

    const user_id = <string>(await creteUserUseCase.execute(user)).id;

    await createStatementUseCase.execute({
      user_id,
      type: 'deposit' as OperationType,
      amount: 100,
      description: 'Jonathan Deposit',
    });

    await createStatementUseCase.execute({
      user_id,
      type: 'withdraw' as OperationType,
      amount: 50,
      description: 'Jonathan withdraw',
    });

    const balanceAll = await getBalanceUseCase.execute({ user_id });

    expect(balanceAll).toHaveProperty('balance', 50);
  });

  it('should not be able user withdraw money Insufficient funds', async () => {
    const user: ICreateUserDTO = {
      name: 'Jonathan Money',
      email: 'jonathanRootMoney',
      password: '1212'
    }

    const user_id = <string>(await creteUserUseCase.execute(user)).id;

    await createStatementUseCase.execute({
      user_id,
      type: 'deposit' as OperationType,
      amount: 100,
      description: 'Jonathan Deposit',
    });

    await expect(
      createStatementUseCase.execute({
        user_id,
        type: 'withdraw' as OperationType,
        amount: 150,
        description: 'Jonathan withdraw',
      })
    ).rejects.toEqual(new CreateStatementError.InsufficientFunds());
  });
});
