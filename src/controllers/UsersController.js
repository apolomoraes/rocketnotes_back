const { hash } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

class UsersController {
  /* Um controller pode conter:
  - Uma função de index: GET para listar vários registros
  - show: GET para exibir um registro especifico
  - create: POST para criar um registro
  - update: PUT para atualizar um registro
  - delete: DELETE para remover um registro
  */
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUserExist = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExist) {
      throw new AppError('Este e-mail já está em uso.')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE = (?)', [id])

    if (!user) {
      throw new AppError('Usuário não encontrado')
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este e-mail já está em uso')
    }

    user.name = name
    user.email = email

    await database.run(
      `UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = ?,
    WHERE id = ?`,
      [user.name, user.email, user.password, new Date(), id]
    )

    return response.status(200).json()
  }
}

module.exports = UsersController
