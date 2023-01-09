const { Router } = require('express')

const NotesController = require('../controllers/NotesController')

const notesRoutes = Router()

// function myMiddleware(request, response, next) {
//   if (!request.body.isAdmin /* request*/) {
//     return response.json({
//       message: 'user não autorizado, você não é adm'
//     }) /* response */
//   }

//   next() /*next*/
// }

const notesController = new NotesController()

// usersRoutes.use(myMiddleware) está linha aplica o middleware para todas rotas de usuário

notesRoutes.post('/:user_id', /*myMiddleware,*/ notesController.create)
//o middleware nesse caso está se aplicando para uma rota específica

notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)



module.exports = notesRoutes
