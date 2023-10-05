let categorias = [];

class CategoriasController {
    insertar(categoria, idModalidad) {
        /* insertar categoria */
    }

    editar(categoria, params) {
        /* editar categoria */
    }

    eliminar(idCategoria) {
        categorias.find((categoria, i) => {
            if (categoria.id === idCategoria) {
                categorias.splice(i, 1);
            }
        })
    }
}