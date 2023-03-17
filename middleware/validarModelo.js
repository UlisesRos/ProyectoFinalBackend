const {Botin} = require('../models/botinesProd');

module.exports = validarModelo = async ( req, res, next ) => {

    try {
        const item = await Botin.findOne(req.params);
        if (item != null) {
            next()
        } else {
            res.status(501).json({msg: "No se encontro el botin que estas buscando!"})
        }
    } catch (error) {
        res.status(401).json(error)
    }
}