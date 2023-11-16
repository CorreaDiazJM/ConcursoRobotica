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

    mostrarEquiposPatrocinados() {
        return new Promise((resolve, reject) => {
            PatrocinadoresModel.mostrarEquiposPatrocinados()
                .catch((err) => reject(err))
                .then((patrocinadores) => {
                    const equipos = [];
                    let ultimo_patrocinador = 0;

                    for (const pat of patrocinadores) {
                        const { patrocinador, equipo } = pat;

                        if (!equipos.length) {
                            equipos.push({
                                patrocinador: patrocinador,
                                equipos_patrocinados: [equipo]
                            });
                        } else if (patrocinador === equipos[ultimo_patrocinador].patrocinador) {
                            equipos[ultimo_patrocinador].equipos_patrocinados.push(equipo);
                        } else {
                            ultimo_patrocinador++;
                            equipos.push({
                                patrocinador: patrocinador,
                                equipos_patrocinados: [equipo]
                            });
                        }
                    }

                    resolve(equipos);
                });
        });
    }
}


module.exports = new PatrocinadoresController();
