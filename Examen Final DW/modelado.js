// Importa la librería Mongoose para modelar objetos y realizar operaciones con MongoDB
const mongoose = require('mongoose');

// Define el esquema de un paciente usando la funcionalidad Schema de Mongoose
const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // Campo de tipo String y obligatorio
  apellido: { type: String, required: true }, // Campo de tipo String y obligatorio
  fechadeNacimiento: { type: Date, required: true }, // Campo de tipo Date y obligatorio
  genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] }, // Campo de tipo String con valores permitidos predefinidos
  direccion: { type: String }, // Campo de tipo String
  numeroTelefono: { type: String } // Campo de tipo String
});

// Crea un modelo de Mongoose llamado 'Paciente' basado en el esquema definido anteriormente
const Paciente = mongoose.model('paciente', pacienteSchema);
// 'paciente' es el nombre de la colección en la base de datos, y será representado por este modelo

// Exporta el modelo de Paciente para ser utilizado en otros archivos de la aplicación
module.exports = Paciente;
