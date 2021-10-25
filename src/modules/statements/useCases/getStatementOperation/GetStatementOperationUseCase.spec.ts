import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { OperationType } from "../createStatement/CreateStatementController";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let inMemoryUserRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let inMemoryStatementRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe('get statement operation', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);

    inMemoryStatementRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUserRepository, inMemoryStatementRepository);

    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUserRepository, inMemoryStatementRepository);

  });

  it('should be able get statement operation', async () => {
    const user: ICreateUserDTO = {
      name: 'Jonathan Statemnt',
      email: 'stamw@mail',
      password: '212'
    }

    const user_id = <string>(await createUserUseCase.execute(user)).id;

    const createStatement = await createStatementUseCase.execute({
      user_id,
      type: 'deposit' as OperationType,
      amount: 900,
      description: 'deposito'
    });


    const statement_id = <string>createStatement.id;

    const operation = await getStatementOperationUseCase.execute({user_id, statement_id});

    expect(operation).toHaveProperty('id');
    expect(operation).toHaveProperty('user_id');
    expect(operation).toHaveProperty('type', 'deposit');
  });
});
