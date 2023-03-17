module.exports = ( req, res, next ) => {
    if (!req.session.persona) {
        return res.json({msg: 'No estas en Session'})
    } else {
        next()
    }
}