require('dotenv').config();
const jwt = require('jsonwebtoken');


const checkLogin = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = (header)? header.replace('Bearer ', '') : process.env.TOKEN_USUARIO;   
        let decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        req.token_data = decoded;

        next();
    } catch(err) {
        if (process.env.TOKEN_USUARIO) {
            res.redirect('/usuarios/login');
        } else {
            res.status(400).send('Token inválido');
        }
    }
}


module.exports = { checkLogin };
