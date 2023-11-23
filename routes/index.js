const express = require('express');
const { checkLogin } = require('../middleware/auth');
const router = express.Router();

/* GET home page. */
router.get('/', checkLogin, function(req, res, next) {
  const { nombre, username: usuario, rol } = req.token_data;

  res.render('index', {
    title: 'Concurso de Robótica',
    nombre,
    usuario,
    rol
  });
});

module.exports = router;
