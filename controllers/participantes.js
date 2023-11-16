const ParticipantesModel = require('../models/participantes');


class ParticipantesController {
    insertar(nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.insertar(nombre, apellido, idEquipo)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    editar(idParticipante, nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.editar(idParticipante, nombre, apellido, idEquipo)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            ParticipantesModel.mostrar()
                .catch((err) => reject(err))
                .then((participantes) => resolve(participantes));
        });
    }

    mostrarParticipante(nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.mostrarParticipante(nombre, apellido, idEquipo)
                .catch((err) => reject(err))
                .then((participante) => resolve(participante));
        });
    }

    eliminar(idParticipante) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.eliminar(idParticipante)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }
}


module.exports = new ParticipantesController();
