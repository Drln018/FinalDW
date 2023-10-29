// Requiere los paquetes necesarios
const express = require('express');
const bcrypt = require('bcrypt');
const { expressjwt } = require('express-jwt');
const jwt = require('jsonwebtoken');
const User = require('./modelo.js'); // Importa el modelo de usuario desde un archivo externo

// Obtiene la clave secreta desde una variable de entorno
const envVariable = process.env.SECRET;

// Middleware para validar el token JWT
const validateJWT = expressjwt({ secret: envVariable, algorithms: ['HS256'] });

// Función para firmar un token JWT utilizando la clave secreta
const signToken = (_id) => jwt.sign({ _id }, envVariable);

// Función asincrónica para buscar y asignar un usuario basado en el ID del token
const findAndAssignUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id);
        if (!user) {
            return res.status(403).end(); // Si el usuario no existe, responde con un error 403
        }
        req.auth = user; // Asigna el usuario al objeto de solicitud (req) para su posterior uso
        next(); // Llama al siguiente middleware o ruta
    } catch (e) {
        next(e); // Manejo de errores
    }
};

// Middleware que engloba la validación JWT y la búsqueda y asignación de usuario
const isAuthenticated = express.Router().use(validateJWT, findAndAssignUser);

// Objeto que contiene métodos de autenticación
const Auth = {
    login: async (req, res) => {
        const { body } = req;
        try {
            // Busca un usuario basado en el correo proporcionado
            const user = await User.findOne({ correo: body.correo });
            if (!user) {
                return res.status(403).send('Usuario y/o Contraseña incorrectos'); // Si no se encuentra el usuario, responde con un error
            } else {
                // Compara la contraseña ingresada con la contraseña almacenada mediante bcrypt
                const isMatch = await bcrypt.compare(body.contrasena, user.contrasena);
                if (isMatch) {
                    const signed = signToken(user._id); // Genera un token JWT si las credenciales son correctas
                    res.status(200).send({ signed: signed, user: user._id }); // Responde con el token y el ID del usuario
                } else {
                    res.status(403).send(`Usuario y/o Contraseña incorrectos`); // Responde con un error si las contraseñas no coinciden
                }
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message); // Manejo de errores
        }
    },
    register: async (req, res) => {
        try {
            const { correo, contrasena } = req.body;

            if (!correo || !contrasena) {
                console.log('Ningún dato puede ser nulo. Saliendo.');
                return res.status(403).json({ message: 'Los datos no pueden ser nulos.' }); // Verificación de datos vacíos
            }

            // Verifica si ya existe un usuario con el correo proporcionado
            const isUser = await User.findOne({ correo: correo });
            if (isUser) {
                return res.status(403).send('El usuario ya existe.'); // Si el usuario ya existe, responde con un error
            }

            // Encripta la contraseña y crea un nuevo usuario en la base de datos
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(contrasena, salt);
            const user = await User.create({ correo: correo, contrasena: hash, salt });
            const signed = signToken(user._id); // Genera un token JWT para el nuevo usuario
            res.send({ signed: signed, user: user._id }); // Responde con el token y el ID del usuario registrado
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Error al registrar el usuario.' }); // Manejo de errores
        }
    },
};

// Exporta los métodos de autenticación y el middleware de autenticación
module.exports = { Auth, isAuthenticated };
