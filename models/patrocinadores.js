const db = require('../database/connection');


class PatrocinadoresModel {
    async insertar(patrocinador) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Patrocinador (patrocinador) VALUES (?);', [patrocinador], (err) => {
                if (err) reject('Ya existe el patrocinador');
                resolve();
            });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Patrocinador;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    async mostrarPatrocinadorPorNombre(patrocinador) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Patrocinador WHERE patrocinador = ?;', [patrocinador], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    async mostrarPatrocinadorPorId(idPatrocinador) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Patrocinador WHERE id = ?;', [idPatrocinador], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject('No existe el patrocinador');
                resolve(results[0]);
            });
        });
    }

    async mostrarEquiposPatrocinados() {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT patrocinador, equipo FROM Patrocinador INNER JOIN Equipo ON Patrocinador.id = id_pat ORDER BY patrocinador;',
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
        });
    }
}


module.exports = new PatrocinadoresModel();
