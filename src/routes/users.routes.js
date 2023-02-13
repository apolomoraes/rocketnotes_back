const { Router } = require('express')

const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router()

// function myMiddleware(request, response, next) {
//   if (!request.body.isAdmin /* request*/) {
//     return response.json({
//       message: 'user não autorizado, você não é adm'
//     }) /* response */
//   }

//   next() /*next*/
// }

const usersController = new UsersController()

// usersRoutes.use(myMiddleware) está linha aplica o middleware para todas rotas de usuário

usersRoutes.post('/', /*myMiddleware,*/ usersController.create)
//o middleware nesse caso está se aplicando para uma rota específica

usersRoutes.put('/', ensureAuthenticated, usersController.update)


module.exports = usersRoutes
