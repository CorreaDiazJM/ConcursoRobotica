require('dotenv').config();
const jwt = require('jsonwebtoken');


const checkLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        let decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        next();
    } catch(err) {
        res.status(400).send('Token inválido');
    }
}


module.exports = { checkLogin };
