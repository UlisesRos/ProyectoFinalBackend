//Express
const express = require('express');
const router = express.Router();
//Controller
const loginControllers = require('../controllers/loginControllers');
//Express Validator
const { check } = require('express-validator');
//Middleware
const auth = require('../middleware/auth');
const validarToken = require('../middleware/validarToken');


//Routers
router.get('/bienvenida', loginControllers.bienvenida);

//Crear Usuario
router.post('/newUser', loginControllers.register)

//Lista de Usuarios
router.get('/usuariosList', loginControllers.usuariosList);

//Eliminar Usuario
router.delete('/eliminarUsuario/:id', loginControllers.eliminarUsuario);

//PruebaToken
router.post('/pruebaToken', loginControllers.pruebaToken);
router.get('/testToken',validarToken, loginControllers.testToken)

//LoginToken
router.post('/loginToken',[
    check('email').not().isEmpty().withMessage('el campo email es obligatorio'),
    check('password').not().isEmpty().withMessage('el campo password es obligatorio')
], loginControllers.loginToken);


module.exports = router