const db = require('../database/connection');
const ModalidadesModel = require('./modalidades');


class CategoriasModel {
    insertar(categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.mostrarModalidadPorId(idModalidad)
                .catch((err) => reject(err))
                .then(() => {
                    console.log('PASO');
                    db.query(
                        'INSERT INTO Categoria (categoria, id_mod) VALUES (?, ?);',
                        [categoria, idModalidad],
                        (err) => {
                            if (err) reject('Ya existe la categoría');
                            resolve();
                        }
                    );
                });
        });
    }

    mostrarCategoriaPorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Categoria WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject('No existe la categoría');
                resolve(results[0]);
            });
        });
    }

    mostrarCategoriaPorNombre(categoria) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Categoria WHERE categoria = ?', [categoria], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    editar(idCategoria, categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.mostrarModalidadPorId(idModalidad)
                .catch((err) => reject(err))
                .then(() => {
                    this.mostrarCategoriaPorId(idCategoria)
                        .catch((err) => reject(err))
                        .then(() => {
                            db.query(
                                'UPDATE Categoria SET categoria = ?, id_mod = ? WHERE id = ?;',
                                [categoria, idModalidad, idCategoria],
                                (err) => {
                                    if (err) reject(err);
                                    resolve();
                                });
                        });
                });
        });
    }

    // eliminar(idCategoria) {
    //     for (let i = 0; i < categorias.length; i++) {
    //         const categoria = categorias[i];
            
    //         if (categoria.id === idCategoria) {
    //             categorias.splice(i, 1);
    //         }
    //     }
    // }

    // mostrar() {
    //     return categorias;
    // }
}


module.exports = new CategoriasModel();
