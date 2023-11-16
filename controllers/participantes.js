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

    mostrarParticipantesPorEquipo() {
        return new Promise((resolve, reject) => {
            ParticipantesModel.mostrarParticipantesPorEquipo()
                .catch((err) => reject(err))
                .then((participantes) => {
                    const equipos = [];
                    let ultimo_equipo = 0;

                    for (const participante of participantes) {
                        const { nombre, apellido } = participante;

                        if (!equipos.length) {
                            equipos.push({
                                equipo: participante.equipo,
                                participantes: [{ nombre, apellido }]
                            });
                        } else if (participante.equipo === equipos[ultimo_equipo].equipo) {
                            equipos[ultimo_equipo].participantes.push({ nombre, apellido });
                        } else {
                            ultimo_equipo++;
                            equipos.push({
                                equipo: participante.equipo,
                                participantes: [{ nombre, apellido }]
                            })
                        }
                    }

                    resolve(equipos);
                });
        });
    }
}


module.exports = new ParticipantesController();
