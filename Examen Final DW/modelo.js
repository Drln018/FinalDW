const mongoose = require('mongoose');

// Se define un modelo de usuario utilizando Mongoose
const User = mongoose.model('user', {
    correo: String, // Campo para el correo del usuario, de tipo String
    contrasena: String, // Campo para la contraseña del usuario, de tipo String
    salt: String, // Campo para el 'salt' (sal) del usuario, de tipo String
});

// Se exporta el modelo de usuario para ser utilizado en otras partes de la aplicación
module.exports = User;
