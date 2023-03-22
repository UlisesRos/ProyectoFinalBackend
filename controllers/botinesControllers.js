const { Botin } = require('../models/botinesProd');

//Express Validator
const { validationResult } = require('express-validator')
//AXIOS
const axios = require('axios')

//Objeto para conectar la API del clima de la ciudad de Rosario
const options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
    params: {lat: '-32.94682', lon: '-60.63932'},
    headers: {
        'X-RapidAPI-Key': 'a6f134be2emsh99cd0edd8c3ac2ap14d5c0jsn12c993266b0c',
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
    }
};

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
    },

    //AXIOS

    //Consulta a la API del clima de la ciudad de Rosario
    async consultaClima ( req, res ){
        
        try {
            const respuesta = await axios.request(options);
            res.status(200).json({data: respuesta.data, status: respuesta.status});
        } catch (error) {
            res.json({status: error.response.status, data: error.response.data})
        }
    }

}