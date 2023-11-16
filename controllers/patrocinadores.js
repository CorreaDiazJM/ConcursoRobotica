const PatrocinadoresModel = require('../models/patrocinadores');


class PatrocinadoresController {
    insertar(patrocinador) {
        return new Promise((resolve, reject) => {
            PatrocinadoresModel.insertar(patrocinador)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            PatrocinadoresModel.mostrar()
                .catch((err) => reject(err))
                .then((patrocinadores) => resolve(patrocinadores));
        });
    }

    mostrarPatrocinador(patrocinador) {
        return new Promise((resolve, reject) => {
            PatrocinadoresModel.mostrarPatrocinadorPorNombre(patrocinador)
                .catch((err) => reject(err))
                .then((patrocinador) => resolve(patrocinador));
        });
    }
}


module.exports = new PatrocinadoresController();
