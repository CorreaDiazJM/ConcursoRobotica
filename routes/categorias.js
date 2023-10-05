let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/:idCategoria/participantes', (req, res) => {
    res.send('Mostrar equipos en la categoria ' + req.params.idCategoria);
})

module.exports = router;
