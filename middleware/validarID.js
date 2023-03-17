const { Botin } = require('../models/botinesProd')

module.exports = validarID = async ( req, res, next ) => {

    try {
        const item = await Botin.findById(req.params.id);
        if (item != null) {
            next()
        } else {
            res.status(501).json({msg: 'El ID ingresado es invalido'})
        }
    } catch (error) {
        res.status(401).json(error)
    }

}