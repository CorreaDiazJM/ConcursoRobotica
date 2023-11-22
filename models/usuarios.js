const db = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


class UsuariosModel {
    async insertar(usuario, nombre, rol, password) {
        return new Promise((resolve, reject) => {
            this.buscarPorUsuario(usuario)
                .catch((err) => reject(err))
                .then((user) => {
                    if (!user) {
                        const pass = bcrypt.hashSync(password, 10);
    
                        db.query(
                            'INSERT INTO Usuario (usuario, nombre, rol_id, password) VALUES (?, ?, ?, ?);',
                            [usuario, nombre, rol, pass],
                            (err) => {
                                if (err) reject('El nombre ya está registrado');
                                const token = jwt.sign({
                                    username: usuario,
                                    rol: rol
                                }, process.env.SECRET_TOKEN);
                                resolve(token);
                            });
                    } else {
                        reject('El usuario ya está registrado');
                    }
                });
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Usuario;', (err, results) => {
                if (err) reject(err)
                resolve(results);
            });
        });
    }

    async buscarPorUsuario(usuario) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM Usuario WHERE usuario = ?;', [usuario], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
}


module.exports = new UsuariosModel();
