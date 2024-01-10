const db = require("../database/models");

let globalUserLogMiddleware = async (req,res,next) => {
    res.locals.isLogged = false
    
    if (req.cookies.userEmail) {
        let userFromCookie = await db.User.findOne({
            where : {email : req.cookies.userEmail},
            include: [
                {association: "addresses"}
            ] 
        })
        req.session.userLogged = userFromCookie
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }

    return next()   

}

module.exports= globalUserLogMiddleware