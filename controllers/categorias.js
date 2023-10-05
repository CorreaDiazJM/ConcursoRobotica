let categorias = [];

class CategoriasController {
    insertar(categoria, idModalidad) {
        /* insertar categoria */
    }

    editar(categoria, params) {
        /* editar categoria */
    }

    eliminar(categoria) {
        categorias.find((categoria, i) => {
            if (categoria.id === categoria) {
                categorias.splice(i, 1);
            }
        })
    }
}