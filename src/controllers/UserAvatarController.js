const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")


class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users")
      .where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Somente usuário autenticados podem mudar a foto de perfil", 401);
    }

    if (user.avatar) {
      //pegar foto que já existe e deletar para colocar uma nova
      await diskStorage.deleteFile(user.avatar);
    }

    // passando a nova imagem
    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename;

    await knex("users").update(user).where({ id: user_id });

    return response.json(user);
  }
}

module.exports = UserAvatarController;