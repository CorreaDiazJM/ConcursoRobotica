const ModalidadesModel = require('../models/modalidades');


class ModalidadesController {
    async insertar(modalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.insertar(modalidad)
                .catch((err) => reject(err))
                .then(() => resolve());
        })
    }

    async mostrarModalidad(modalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.mostrarModalidadPorNombre(modalidad)
                .catch((err) => reject(err))
                .then((modalidad) => resolve(modalidad));
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            ModalidadesModel.mostrar()
                .catch((err) => reject(err))
                .then((modalidades) => resolve(modalidades));
        });
    }
}


module.exports = new ModalidadesController();
