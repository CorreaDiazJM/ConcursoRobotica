const db = require('../database/connection');
const PatrocinadoresModel = require('./patrocinadores');
const CategoriasModel = require('./categorias');


class EquiposModel {
    async insertar(equipo, idPatrocinador) {
        return new Promise((resolve, reject) => {
            PatrocinadoresModel.mostrarPatrocinadorPorId(idPatrocinador)
                .catch((err) => reject(err))
                .then(() => {
                    db.query('INSERT INTO Equipo (equipo, id_pat) VALUES (?, ?);', [equipo, idPatrocinador], (err) => {
                        if (err) reject('Ya existe el equipo');
                        resolve();
                    });
                });
        });
    }

    async inscribirEnCategoria(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            CategoriasModel.mostrarCategoriaPorId(idCategoria)
                .catch((err) => reject(err))
                .then(() => {
                    this.mostrarEquipoPorId(idEquipo)
                        .catch((err) => reject(err))
                        .then(() => {
                            this.mostrarCategoriasInscritas(idEquipo)
                                .catch((err) => reject(err))
                                .then((inscripciones) => {
                                    let esta_inscrito = false;

                                    for (const inscripcion of inscripciones) {
                                        if (inscripcion.id_cat === idCategoria && inscripcion.id_equ === idEquipo) {
                                            esta_inscrito = true;
                                            reject('El equipo ya se encuentra inscrito');
                                        }
                                    }

                                    if (!esta_inscrito) {
                                        db.query(
                                            'INSERT INTO Categoria_Equipo (id_cat, id_equ) VALUES (?, ?);',
                                            [idCategoria, idEquipo],
                                            (err) => {
                                                if (err) reject(err);
                                                resolve();
                                            });
                                    }
                                });
                        });
                });
        });
    }

    async eliminarInscripcion(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            this.mostrarCategoriasInscritas(idEquipo)
                .catch((err) => reject(err))
                .then((inscripciones) => {
                    CategoriasModel.mostrarCategoriaPorId(idCategoria)
                        .catch((err) => reject(err))
                        .then(() => {
                            let esta_inscrito = false;
        
                            for (const inscripcion of inscripciones) {
                                if (inscripcion.id_cat === parseInt(idCategoria)) {
                                    esta_inscrito = true;
        
                                    db.query('DELETE FROM Categoria_Equipo WHERE id = ?;', [inscripcion.id], (err) => {
                                        if (err) reject(err);
                                        resolve();
                                    });

                                    break;
                                }
                            }
        
                            if (!esta_inscrito) {
                                reject('El equipo no está inscrito');
                            }
                        });
                });
        });
    }

    async mostrarEquipoPorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Equipo WHERE id = ?;', [id], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject('No existe el equipo');
                resolve(results[0]);
            });
        });
    }

    async mostrarEquipoPorNombre(equipo) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Equipo WHERE equipo = ?;', [equipo], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    async mostrarCategoriasInscritas(id) {
        return new Promise((resolve, reject) => {
            this.mostrarEquipoPorId(id)
                .catch((err) => reject(err))
                .then(() => {
                    db.query(
                        'SELECT * FROM Categoria_Equipo WHERE id_equ = ?;',
                        [id],
                        (err, results) => {
                            if (err) reject(err);
                            resolve(results);
                        });
                });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Equipo;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        })
    }

    async eliminar(idEquipo) {
        return new Promise((resolve, reject) => {
            this.mostrarEquipoPorId(idEquipo)
                .catch((err) => reject(err))
                .then(() => {
                    db.query('DELETE FROM Equipo WHERE id = ?;', [idEquipo], (err) => {
                        if (err) reject(err);
                        resolve();
                    });
                });
        });
    }

    async mostrarEquiposPorCategoria(idCategoria) {
        return new Promise((resolve, reject) => {
            CategoriasModel.mostrarCategoriaPorId(idCategoria)
                .catch((err) => reject(err))
                .then(() => {
                    db.query(
                        'SELECT Equipo.* FROM Categoria_Equipo INNER JOIN Equipo ON id_equ = Equipo.id WHERE id_cat = ?;',
                        [idCategoria],
                        (err, results) => {
                            if (err) reject(err);
                            resolve(results);
                        });
                });
        });
    }

    async editar(idEquipo, equipo, idPatrocinador) {
        return new Promise((resolve, reject) => {
            PatrocinadoresModel.mostrarPatrocinadorPorId(idPatrocinador)
                .catch((err) => reject(err))
                .then(() => {
                    this.mostrarEquipoPorId(idEquipo)
                        .catch((err) => reject(err))
                        .then(() => {
                            db.query(
                                'UPDATE Equipo SET equipo = ?, id_pat = ? WHERE id = ?',
                                [equipo, idPatrocinador, idEquipo],
                                (err) => {
                                    if (err) reject('Ese nombre ya se encuentra registrado');
                                    resolve();
                                });
                        });
                });
        });
    }

    async mostrarInscripciones() {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT categoria, equipo, id_equ, id_cat FROM Categoria_Equipo INNER JOIN Equipo ON Equipo.id = id_equ INNER JOIN Categoria ON Categoria.id = id_cat ORDER BY categoria;',
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }
}


module.exports = new EquiposModel();
