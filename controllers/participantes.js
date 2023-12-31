const ParticipantesModel = require('../models/participantes');


class ParticipantesController {
    async insertar(nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.insertar(nombre, apellido, idEquipo)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async editar(idParticipante, nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.editar(idParticipante, nombre, apellido, idEquipo)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            ParticipantesModel.mostrar()
                .catch((err) => reject(err))
                .then((participantes) => resolve(participantes));
        });
    }

    async mostrarParticipante(nombre, apellido, idEquipo) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.mostrarParticipante(nombre, apellido, idEquipo)
                .catch((err) => reject(err))
                .then((participante) => resolve(participante));
        });
    }

    async eliminar(idParticipante) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.eliminar(idParticipante)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrarParticipantesPorEquipo() {
        return new Promise((resolve, reject) => {
            ParticipantesModel.mostrarParticipantesPorEquipo()
                .catch((err) => reject(err))
                .then((participantes) => {
                    const equipos = [];
                    let ultimo_equipo = 0;

                    for (const participante of participantes) {
                        const { nombre, apellido, id } = participante;

                        if (!equipos.length) {
                            equipos.push({
                                equipo: participante.equipo,
                                participantes: [{ nombre, apellido, id }]
                            });
                        } else if (participante.equipo === equipos[ultimo_equipo].equipo) {
                            equipos[ultimo_equipo].participantes.push({ nombre, apellido, id });
                        } else {
                            ultimo_equipo++;
                            equipos.push({
                                equipo: participante.equipo,
                                participantes: [{ nombre, apellido, id }]
                            })
                        }
                    }

                    resolve(equipos);
                });
        });
    }

    async mostrarParticipantePorId(idParticipante) {
        return new Promise((resolve, reject) => {
            ParticipantesModel.mostrarParticipantesPorId(idParticipante)
                .catch((err) => reject(err))
                .then((participante) => resolve(participante));
        });
    }
}


module.exports = new ParticipantesController();
