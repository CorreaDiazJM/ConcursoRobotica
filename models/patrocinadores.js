const db = require('../database/connection');


class PatrocinadoresModel {
    insertar(patrocinador) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO Patrocinador (patrocinador) VALUES (?);', [patrocinador], (err) => {
                if (err) reject('Ya existe el patrocinador');
                resolve();
            });
        });
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Patrocinador;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    mostrarPatrocinadorPorNombre(patrocinador) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Patrocinador WHERE patrocinador = ?;', [patrocinador], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    mostrarPatrocinadorPorId(idPatrocinador) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Patrocinador WHERE id = ?;', [idPatrocinador], (err, results) => {
                if (err) reject(err);
                if (!results.length) reject('No existe el patrocinador');
                resolve(results[0]);
            });
        });
    }
}


module.exports = new PatrocinadoresModel();
