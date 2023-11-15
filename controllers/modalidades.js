const ModalidadesModel = require('../models/modalidades');


class ModalidadesController {
    insertar(modalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.insertar(modalidad)
                .catch((err) => reject(err))
                .then(() => resolve());
        })
    }

    mostrarModalidad(modalidad) {
        return new Promise((resolve, reject) => {
            ModalidadesModel.mostrarModalidadPorNombre(modalidad)
                .catch((err) => reject(err))
                .then((modalidad) => resolve(modalidad));
        });
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            ModalidadesModel.mostrar()
                .catch((err) => reject(err))
                .then((modalidades) => resolve(modalidades));
        });
    }
}


module.exports = new ModalidadesController();
