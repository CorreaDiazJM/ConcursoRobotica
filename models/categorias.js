const db = require('../database/connection');
const ModalidadesModel = require('./modalidades');


class CategoriasModel {
    async insertar(categoria, idModalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.mostrarModalidadPorId(idModalidad)
                .catch((err) => reject(err))
                .then(() => {
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

    async mostrarCategoriaPorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Categoria WHERE id = ?', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject('No existe la categoría');
                resolve(results[0]);
            });
        });
    }

    async mostrarCategoriaPorNombre(categoria) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Categoria WHERE categoria = ?', [categoria], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    async editar(idCategoria, categoria, idModalidad) {
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
                                    if (err) reject('Ya existe la categoría');
                                    resolve();
                                });
                        });
                });
        });
    }

    async eliminar(idCategoria) {
        return new Promise((resolve, reject) => {
            this.mostrarCategoriaPorId(idCategoria)
                .catch((err) => reject(err))
                .then(() => {
                    db.query('DELETE FROM Categoria WHERE id = ?', [idCategoria], (err) => {
                        if (err) reject(err);
                        resolve();
                    });
                });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Categoria;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async mostrarCategoriasPorModalidad() {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT modalidad, categoria, Categoria.id FROM Modalidad INNER JOIN Categoria ON Modalidad.id = id_mod ORDER BY modalidad;',
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }
}


module.exports = new CategoriasModel();
