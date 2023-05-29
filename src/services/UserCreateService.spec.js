const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require('../utils/AppError');


describe("UserService", () => {
  let userRepositoryInMemory = null;
  let userCreateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("Verificar se o usuário é criado com sucesso", async () => {
    const user = {
      name: "User test",
      email: "usertest@gmail.com",
      password: "123"
    };

    const userCreated = await userCreateService.execute(user);
    expect(userCreated).toHaveProperty("id");
  });

  it("Verificar se tem como cadastrar usuários já cadastrados pelo email", async () => {
    const userOne = {
      name: "User Test One",
      email: "user@test.com",
      password: "123"
    };

    const userTwo = {
      name: "User Test Two",
      email: "user@test.com",
      password: "123"
    };

    await userCreateService.execute(userOne);
    await expect(userCreateService.execute(userTwo)).rejects.toEqual(new AppError("Este e-mail já está em uso."));
  });
})