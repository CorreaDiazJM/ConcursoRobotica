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

    mostrarCategoriasPorModalidad() {
        return new Promise((resolve, reject) => {
            CategoriasModel.mostrarCategoriasPorModalidad()
                .catch((err) => reject(err))
                .then((datos) => {
                    const modalidades = [];
                    const ultima_modalidad = 0;

                    for (const dato of datos) {
                        const { modalidad, categoria } = dato;

                        if (!modalidades.length) {
                            modalidades.push({
                                modalidad: modalidad,
                                categorias: [categoria]
                            });
                        } else if (modalidad === modalidades[ultima_modalidad].modalidad) {
                            modalidades[ultima_modalidad].categorias.push(categoria);
                        } else {
                            ultima_modalidad++;
                            modalidades.push({
                                modalidad: modalidad,
                                categorias: [categoria]
                            });
                        }
                    }

                    resolve(modalidades);
                });
        });
    }
}

module.exports = new CategoriasController();
