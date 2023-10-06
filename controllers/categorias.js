let categorias = [];

class CategoriasController {
    insertar(categoria, idModalidad) {
        /* insertar categoria */
    }

    editar(categoria, params) {
        /* editar categoria */
    }

    // Método para editar una categoría
function editarCategoria(req, res) {
  const categoriaId = req.params.id;
  const nuevaInformacion = req.body;

  // Aquí deberías implementar la lógica para buscar y actualizar la categoría en tu sistema
  // Por ejemplo, las categorias, puedes utilizar una consulta para actualizar los datos

  // Ejemplo de actualización de categoría en una base de datos
  Categoria.findByIdAndUpdate(
    categoriaId,
    { $set: nuevaInformacion },
    { new: true }
  )
    .then(categoriaActualizada => {
      if (categoriaActualizada) {
        // La categoría se actualizó correctamente
        res.status(200).json({ mensaje: 'Categoría editada exitosamente' });
      } else {
        // La categoría no existe
        res.status(404).json({ mensaje: 'La categoría no existe' });
      }
    })
    .catch(error => {
      // Ocurrió un error durante la actualización
      res.status(500).json({ mensaje: 'Error al editar la categoría' });
    });
}

module.exports = { editarCategoria };
    eliminar(idCategoria) {
        categorias.find((categoria, i) => {
            if (categoria.id === idCategoria) {
                categorias.splice(i, 1);
            }
        })
    }
}
