const { Router } = require('express')

const NotesController = require('../controllers/NotesController')
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


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

notesRoutes.use(ensureAuthenticated);

notesRoutes.post('/', /*myMiddleware,*/ notesController.create)
//o middleware nesse caso está se aplicando para uma rota específica

notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)
notesRoutes.get('/', notesController.index)


module.exports = notesRoutes
