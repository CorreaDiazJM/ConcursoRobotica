const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuariosModel = require('../models/usuarios');


class UsuariosController {
    async insertar(usuario, nombre, rol, password) {
        return new Promise((resolve, reject) => {
            UsuariosModel.insertar(usuario, nombre, rol, password)
                .catch((err) => reject(err))
                .then((token) => resolve(token));
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            UsuariosModel.mostrar()
                .catch((err) => reject(err))
                .then((usuarios) => resolve(usuarios));
        });
    }

    async login(usuario, password) {
        return new Promise((resolve, reject) => {
            UsuariosModel.buscarPorUsuario(usuario)
                .catch((err) => reject(err))
                .then((usuario) => {
                    if (!usuario) reject('El usuario no está registrado');
                    
                    if (bcrypt.compareSync(password, usuario.password)) {
                        const token = jwt.sign({
                            username: usuario,
                            rol: usuario.rol
                        }, process.env.SECRET_TOKEN);
                        
                        resolve(token);
                    } else {
                        reject('Contraseña incorrecta');
                    }
                });
        });
    }
}


module.exports = new UsuariosController();
