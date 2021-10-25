import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able create new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Jonathan',
      email: 'jonathanroot@gmail.com',
      password: '21212',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
  });

  it('not should  be able create a new user, already exists', async () => {
    await createUserUseCase.execute({
      name: 'Jonathan Vinicius',
      email: 'jonathanroot3@gmail.com',
      password: '212312',
    });

    await expect(
      createUserUseCase.execute({
        name: 'Jonathan Vinicius',
        email: 'jonathanroot3@gmail.com',
        password: '212312',
      })
    ).rejects.toEqual(new CreateUserError());
  });
});
