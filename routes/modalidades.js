const express = require('express');
const ModalidadesController = require("../controllers/modalidades");

let router = express.Router();


router.post('/', (req, res) => {
    ModalidadesController.insertar(req.body)
    res.send(ModalidadesController.mostrar());
})

router.get('/', (req, res) => {
    res.send(ModalidadesController.mostrar());
})   


module.exports = router;
