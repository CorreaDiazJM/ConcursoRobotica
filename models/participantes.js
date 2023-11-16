const db = require('../database/connection');
const EquiposModel = require('../models/equipo');


class ParticipantesModel {
    insertar(nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarEquipoPorId(idEquipo)
                .catch((err) => reject(err))
                .then(() => {
                    this.mostrarParticipante(nombre, apellido, idEquipo)
                        .catch((err) => reject(err))
                        .then((participante) => {
                            if (!participante) {
                                db.query(
                                    'INSERT INTO Participante (nombre, apellido, id_equ) VALUES (?, ?, ?);',
                                    [nombre, apellido, idEquipo],
                                    (err) => {
                                        if (err) reject(err);
                                        resolve();
                                    });
                            } else {
                                reject('El participante ya está registrado');
                            }
                        });
                });
        });
    }

    editar(idParticipante, nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            this.mostrarParticipantesPorId(idParticipante)
                .catch((err) => reject(err))
                .then(() => {
                    EquiposModel.mostrarEquipoPorId(idEquipo)
                        .catch((err) => reject(err))
                        .then(() => {
                            db.query(
                                'UPDATE Participante SET nombre = ?, apellido = ?, id_equ = ? WHERE id = ?;',
                                [nombre, apellido, idEquipo, idParticipante],
                                (err) => {
                                    if (err) reject(err);
                                    resolve();
                                });
                        });
                });
        });
    }

    mostrarParticipantesPorId(idParticipante) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM Participante WHERE id = ?;',
                [idParticipante],
                (err, results) => {
                    if (err) reject(err);
                    if (!results.length) reject('No existe el participante');
                    resolve(results[0]);
                });
        });
    }

    mostrarParticipante(nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM Participante WHERE nombre = ? AND apellido = ? AND id_equ = ?;',
                [nombre, apellido, idEquipo],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]);
                });
        });
    }

    mostrarParticipantesPorEquipo() {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT equipo, nombre, apellido FROM Equipo INNER JOIN Participante ON Equipo.id = id_equ ORDER BY equipo;',
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Participante;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    eliminar(idParticipante) {
        return new Promise((resolve, reject) => {
            this.mostrarParticipantesPorId(idParticipante)
                .catch((err) => reject(err))
                .then(() => {
                    db.query('DELETE FROM Participante WHERE id = ?', [idParticipante], (err) => {
                        if (err) reject(err);
                        resolve();
                    });
                });
        });
    }
}


module.exports = new ParticipantesModel();
