import auth from "../../../../config/auth";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('authenticate user', () => {
  beforeEach(() => {
    auth.jwt.secret = '620e3b4ce90c1a04cb49c455f92f6e96'
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able authenticate user', async () => {
    await createUserUseCase.execute({
      name: 'jonathanVini',
      email: 'mail@gmail.com',
      password: '2121',
    });

    const userAuthenticate = await authenticateUserUseCase.execute({
      email: 'mail@gmail.com',
      password: '2121',
    });
    expect(userAuthenticate).toHaveProperty('user');
    expect(userAuthenticate).toHaveProperty('token');
  });

  it('not should be able authenticate user email incorrect', async () => {
    await createUserUseCase.execute({
      name: 'jonathanVini123',
      email: 'mail123@gmail.com',
      password: '2120091',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'jonathanVinicius',
        password: '2120091'
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });

  it('not should be able authenticate user password incorrect', async () => {
    await createUserUseCase.execute({
      name: 'jonathan3',
      email: 'mai@gmail.com',
      password: '2120091',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'mai@gmail.com',
        password: '232'
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });
});

