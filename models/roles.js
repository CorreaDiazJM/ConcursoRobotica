const db = require('../database/connection');


class RolesModel {
    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Rol;', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}


module.exports = new RolesModel();
