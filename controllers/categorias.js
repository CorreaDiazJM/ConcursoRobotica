const ModalidadesModel = require('../models/modalidades');
const CategoriasModel = require('../models/categorias');


class CategoriasController {
    insertar(categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            CategoriasModel.insertar(categoria, idModalidad)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    mostrarCategoria(categoria) {
        return new Promise((resolve, reject) => {
            CategoriasModel.mostrarCategoriaPorNombre(categoria)
                .catch((err) => reject(err))
                .then((categoria) => resolve(categoria));
        });
    }

    editar(idCategoria, categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            CategoriasModel.editar(idCategoria, categoria, idModalidad)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    // mostrar() {
    //     return new Promise(())
    // }

    // eliminar(idCategoria) {
    //     for (let i = 0; i < categorias.length; i++) {
    //         const categoria = categorias[i];
            
    //         if (categoria.id === idCategoria) {
    //             categorias.splice(i, 1);
    //         }
    //     }
    // }
}

module.exports = new CategoriasController();
