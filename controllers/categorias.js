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

    eliminar(idCategoria) {
        return new Promise((resolve, reject) => {
            CategoriasModel.eliminar(idCategoria)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            CategoriasModel.mostrar()
                .catch((err) => reject(err))
                .then((categorias) => resolve(categorias));
        });
    }
}

module.exports = new CategoriasController();
