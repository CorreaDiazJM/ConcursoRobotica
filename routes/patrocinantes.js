const PatrocinantesController = require("../controllers/patrocinantes")
const express = require('express');

let router = express.Router();


router.get('/', (req, res) => {
    res.send(PatrocinantesController.mostrar());
});

router.post('/', (req, res) => {
    if (req.body.patrocinante && req.body.participante) {
        const { patrocinante, participante } = req.body;
        PatrocinantesController.insertar(patrocinante, participante);
        res.send(PatrocinantesController.mostrar());
    } else {
        res.status(400).json({
            message: 'Error en los datos de entrada'
        });
    }
});

router.get('/vista', (req, res) => {
    const patrocinantes = PatrocinantesController.mostrar();
    const title = 'Patrocinantes';
    res.render('patrocinantes', { title, patrocinantes });
})

module.exports = router;
