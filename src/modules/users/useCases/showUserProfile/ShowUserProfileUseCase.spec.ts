import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUserRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Show User Profile', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUserRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it('should be able show profile', async () => {
    const user: ICreateUserDTO = {
      name: 'jonathanRoot',
      email: 'jonathanVini@mail',
      password: '123',
    }
    const userCreate = await createUserUseCase.execute(user);

    const userReturn = await showUserProfileUseCase.execute(String(userCreate.id));

    expect(userReturn).toHaveProperty('email');
    expect(userReturn).toHaveProperty('password');

  });

  it('not should be able show profile user not exits', async () => {
    await expect(
      showUserProfileUseCase.execute('fakeId')
    ).rejects.toEqual(new ShowUserProfileError());
  });
});
