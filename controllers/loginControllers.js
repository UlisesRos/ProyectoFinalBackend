const {User} = require('../models/user')

//Express Validator
const { validationResult } = require('express-validator');
//BCRYPT
const bcrypt = require('bcryptjs');
//JWT
const generadorJWT = require('../helpers/generadorJWT')

module.exports = {

    //Bienvenida al Login
    bienvenida ( req, res ){
        res.status(200).send('¡Bienvenidos a Botines Con Gol!')
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

    //TOKEN

    async pruebaToken ( req, res ){
        const token = await generadorJWT(req.body)
        res.json(token)
    },
    testToken ( req, res){
        res.send('Paso el token')
    },

    //LOGIN TOKEN
    async loginToken ( req, res ){
        try {
            const err = validationResult(req);
            if (err.isEmpty()) {
                const usuario = await User.findOne({email: req.body.email}); //Busca el email
                if (usuario === null) { //Valida si el usuario existe
                    res.json({msg: 'El email o la contraseña son incorrectos'});
                    return
                };
                if (!bcrypt.compareSync(req.body.password, usuario.password)) { //Valida el Password
                    res.json({msg: "El email o la contraseña son incorrectos"});
                    return
                };

                const token = await generadorJWT({
                    id: usuario._id,
                    email: usuario.email
                });

                res.json({ msg: "Usuario Logeado", token: token})
            } else {
                res.status(501).json(err)
            }
        } catch (error) {
            res.status(501).json(error)
        }
    }
}