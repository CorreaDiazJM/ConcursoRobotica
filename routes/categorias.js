let express = require('express');
let router = express.Router();

/* GET equipos inscritos en una categoria */
router.get('/:idCategoria/participantes', (req, res) => {
    res.send('Mostrar equipos en la categoria ' + req.params.idCategoria);
});

/* DELETE categoria */
router.delete('/:id', (req, res) => {
    res.send('Eliminar categoria ' + req.params.id);
});

module.exports = router;
