const db = require('../database/connection');


class ModalidadesModel {
    insertar(modalidad) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Modalidad (modalidad) VALUES (?);', [modalidad], (err) => {
                if (err) reject('Ya existe la modalidad');
                resolve();
            });
        });
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Modalidad;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    mostrarModalidadPorId(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Modalidad WHERE id = ?;', [id], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    mostrarModalidadPorNombre(modalidad) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Modalidad WHERE modalidad = ?;', [modalidad], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        })
    }
}


module.exports = new ModalidadesModel();
