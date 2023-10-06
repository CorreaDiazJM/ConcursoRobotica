let express = require('express');
let router = express.Router();
var ModalidadesController = require("../controllers/modalidad");
var CategoriasController = require("../controllers/categorias");

//ingresar categorias y ver
router.post('/', function(req, res, next) {
  CategoriasController.insertar(req.body);
  res.send(ModalidadesController.mostrar());
})

/* GET equipos inscritos en una categoria */
router.get('/:idCategoria/participantes', (req, res) => {
    res.send('Mostrar equipos en la categoria ' + req.params.idCategoria);
});

/* DELETE categoria */
router.delete('/:id', (req, res) => {
    res.send('Eliminar categoria ' + req.params.id);
});

// Importar el controlador de categorías
const categoriasController = require('../controllers/categorias.js');

// Ruta para editar una categoría específica
router.put('/categorias/:id', categoriasController.editarCategoria);

module.exports = router;
