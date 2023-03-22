const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
require('dotenv').config()

module.exports = validarJWT = async (req, res, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }
    try {
        const { body } = jwt.verify(token, process.env.JWT_SECRET); //Esto me va a traer el contenido del body
        const user = await User.findById(body.id)
        if (!user) {
            return res.status(401).json({
                msg: "Token no valido - Base De Datos"
            })
        }
        next()
    } catch (error) {
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}