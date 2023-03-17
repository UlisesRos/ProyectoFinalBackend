const { Botin } = require('../models/botinesProd');

//Express Validator
const { validationResult } = require('express-validator')

module.exports = {

    //Bienvenida
    saludo ( req, res ){
        res.status(200).send('¡Bienvenidos a Botines Con Gol!')
    },

    //Lista de botines
    async lista ( req, res ){
        const items = await Botin.find();
        res.json({items})
    },

    //Buscar botines por ID
    async listaID ( req, res ){
        const item = await Botin.findById(req.params.id);
        res.json({item})
    },

    async buscarBotin ( req, res ){
        const item = await Botin.findOne({modelo: req.params.modelo});
        res.status(200).json({item})
    },

    //Creacion de Botines
    async crearBotines ( req, res ){
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                const item = new Botin(req.body);
                await item.save();
                res.status(201).json(item)
            } else {
                res.status(501).json(err)
            }

        } catch (error) {
            res.status(401).json(error)
        }
    },


    //Editar Botines
    async editarBotines ( req, res ){
        try {
            const err = validationResult(req)
            if (err.isEmpty()) {
                await Botin.findByIdAndUpdate(req.params.id, req.body);
                res.status(201).json({msg: `El producto ${req.params.id} se actualizo correctamente`}) 
            } else {
                res.json(err)
            }
        } catch (error) {
            res.json(error)
        }
    },

    //Eliminar Botines
    async eliminarBotines ( req, res ){
        await Botin.findByIdAndDelete(req.params.id);
        res.json({msg: `El producto ${req.params.id} ha sido eliminado correctamente`})
    }

}