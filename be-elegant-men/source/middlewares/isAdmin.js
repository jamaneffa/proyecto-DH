let isAdmin = (req,res, next) => {
    if (!req.session.userLogged || req.session.userLogged.admin === 0 ) {
        return res.send('/')
    }
    next()
}

module.exports= isAdmin