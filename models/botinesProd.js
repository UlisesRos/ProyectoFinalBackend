const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const botinesProd = new Schema({

    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true,
        unique: true
    },
    precio: {
        type: Number,
        required: true
    },
    talle: {
        type: Number,
        required: true
    },
    stock: {
        type: Boolean,
        required: true
    },
    descripcion: {
        type: String
    }

});

//Generacion del modelo
const Botin = mongoose.model('Botin', botinesProd);
module.exports = { Botin };