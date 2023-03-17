//Express
const express = require('express');
const router = express.Router();
//Controller
const loginControllers = require('../controllers/loginControllers');
//Express Validator
const { check } = require('express-validator');
//Middleware
const auth = require('../middleware/auth')


//Routers
router.get('/bienvenida', loginControllers.bienvenida);

//Crear Usuario
router.post('/newUser', loginControllers.register)

//Lista de Usuarios
router.get('/usuariosList', loginControllers.usuariosList);

//Eliminar Usuario
router.delete('/eliminarUsuario/:id', loginControllers.eliminarUsuario);

//Session
router.get('/session', loginControllers.crearSession);
router.get('/pruebaSession',auth, loginControllers.pruebaSession)
router.get('/cerrar', loginControllers.eliminarSession);

//Login
router.post('/login',[
    check('email').not().isEmpty().withMessage('el campo email es obligatorio'),
    check('password').not().isEmpty().withMessage('el campo password es obligatorio')
], loginControllers.login);

//Logout
router.delete('/logout', loginControllers.logout);


module.exports = router