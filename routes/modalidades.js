var express = require('express');
var router = express.Router();
var ModalidadesController = require("../controllers/modalidad");
const { route } = require('./users');

router.post('/', function(req, res, next) {
  ModalidadesController.insertar(req.body)
  res.send(ModalidadesController.mostrar());
})

router.get('/', function (req, res, next) {
    res.send(ModalidadesController.mostrar());
})   


module.exports = router;
