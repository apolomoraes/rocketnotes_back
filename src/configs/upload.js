const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

// onde a imagem chega.
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

// onde a imagem de fato vai ficar.
const UPLOADS_FOLDER = path.resolve(__dirname, "uploads");

const MULTER = {
  //para onde o arquivo vai ir.
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    // aqui passa o nome do arquivo, usamos o crypto para gerar um número aleatório para combinar com o nome da imagem, para garantir que o usuário não tenha imagens duplicadas.
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}