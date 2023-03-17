const {User} = require('../models/user')

//Express Validator
const { validationResult } = require('express-validator');
//BCRYPT
const bcrypt = require('bcryptjs');

module.exports = {

    //Bienvenida al Login
    bienvenida ( req, res ){
        res.status(200).send('¡Bienvenidos a Botines Con Gol!')
    },

    //SESSION
    crearSession ( req, res ){
        const persona = {
            nombre: "Ulises",
            idioma: "Español"
        };
        console.log(req.session);
        req.session.persona = persona //Crea la Session.
        res.json(req.session.persona)
    },
    pruebaSession ( req, res ){
        console.log(req.cookies.sessionDelUsuario)
        res.json(req.session.persona)
    },

    eliminarSession (req, res){
        req.session.destroy(); //Cierra la session
        res.json({msg: 'session cerrada'})
    },

     //REGISTRARSE
    async register ( req, res ){

        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(req.body.password, salt);

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });
                await newUser.save()
                res.json(newUser)
            } else {
                res.json(err)
            }
        } catch (error) {
            res.json(error)
        }
    },

    //LISTA DE USUARIOS
    async usuariosList ( req, res ){
        const items = await User.find();
        res.json({items})
    },

    //ELIMINAR USUARIO
    async eliminarUsuario ( req, res ){
        await User.findByIdAndDelete(req.params.id);
        res.json({msg: `El usuario con id: ${req.params.id} ha sido eliminado con exito.`})
    },

    //LOGIN
    async login ( req, res ){
        try {
            const err = validationResult(req);
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email}); //Busca el email
                if (usuario === null) { //Valida si el usuario existe
                    res.json({msg: 'El email o la contraseña son incorrectos'});
                    return
                };
                if (!bcrypt.compareSync(req.body.password, usuario.password)) {
                    res.json({msg: "El email o la contraseña son incorrectos"});
                    return
                };

                const user = {
                    _id: usuario._id,
                    name: usuario.name
                }
                
                req.session.persona = user;
                if(req.body.remember) { //Mantener la session iniciada
                    res.cookie("sessionDelUsuario", req.session.persona, {maxAge: 150000})
                };
                res.json({msg: "Usuario Logeado"})
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json(error)
        }
    },

    //LOGOUT
    logout ( req, res ){
        res.clearCookie("sessionDelUsuario");
        req.session.destroy();
        res.json({msg: "Usuario Deslogeado"})
    },
}