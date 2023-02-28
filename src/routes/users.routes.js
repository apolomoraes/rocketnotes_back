const { Router } = require('express')
const multer = require("multer");
const uploadConfig = require('../configs/upload');

const UsersController = require('../controllers/UsersController');
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController()

// usersRoutes.use(myMiddleware) está linha aplica o middleware para todas rotas de usuário

usersRoutes.post('/', /*myMiddleware,*/ usersController.create)
//o middleware nesse caso está se aplicando para uma rota específica

usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), (req, res) => {
  console.log(req.file.filename);
  res.json();
})


module.exports = usersRoutes
