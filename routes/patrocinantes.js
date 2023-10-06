let express = require('express');
let router = express.Router();
var PatrocinantesController = require("../controllers/patrocinantes")

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('Mostrar todos los patrocinantes');
});

//insertar y mostrar lista actualizada
router.post('/', function(req, res, next) {
  PatrocinantesController.insertar(req.body)
  res.send(PatrocinantesController.mostrar());
})

router.get('/:id', (req, res) => {
    res.send('Mostrar patrociante ' + req.params.id);
})

module.exports = router;
