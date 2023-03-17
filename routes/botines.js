//Express
const express = require('express');
const router = express.Router();

//Controller
const botinesControllers = require('../controllers/botinesControllers');
//Middleware
const validarID = require('../middleware/validarID');
const validarModelo = require('../middleware/validarModelo');
//Express Validator
const { check } = require('express-validator');


//Routers
router.get('/saludo', botinesControllers.saludo);

router.get('/listaBotines', botinesControllers.lista);
router.get('/listaID/:id', botinesControllers.listaID);
router.get('/buscarBotin/:modelo', validarModelo, botinesControllers.buscarBotin);

//CRUD
//POST
router.post('/crearBotin',[
    check('marca').not().isEmpty().withMessage('El campo marca es obligatorio').isLength({min: 2, max: 10}).withMessage('El campo marca debe tener un minimo de 2 caracteres y un maximo de 10'),
    check('modelo').not().isEmpty().withMessage('El campo modelo es obligatorio').isLength({min: 2}).withMessage('El campo modelo debe tener un minimo de 2 caracteres'),
    check('precio').not().isEmpty().withMessage('El campo precio es obligatorio'),
    check('talle').not().isEmpty().withMessage('El campo talle es obligatorio'),
    check('stock').not().isEmpty().withMessage('El campo stock es obligatorio')
], botinesControllers.crearBotines);

//PUT
router.put('/editarBotin/:id', validarID, [
    check('marca').not().isEmpty().withMessage('El campo marca es obligatorio para editar el producto').isLength({min: 2, max: 10}).withMessage('El campo marca debe tener un minimo de 2 caracteres y un maximo de 10'),
    check('modelo').not().isEmpty().withMessage('El campo modelo es obligatorio para editar el producto').isLength({min: 2}).withMessage('El campo modelo debe tener un minimo de 2 caracteres'),
    check('precio').not().isEmpty().withMessage('El campo precio es obligatorio para editar el producto'),
    check('talle').not().isEmpty().withMessage('El campo talle es obligatorio para editar el producto'),
    check('stock').not().isEmpty().withMessage('El campo stock es obligatorio para editar el producto')
], botinesControllers.editarBotines);

//DELETE
router.delete('/eliminarBotin/:id',validarID , botinesControllers.eliminarBotines);


module.exports = router
