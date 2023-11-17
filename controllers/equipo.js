const EquiposModel = require('../models/equipo');


class EquiposController {
    async insertar(equipo, idPatrocinador) {
        return new Promise((resolve, reject) => {
            EquiposModel.insertar(equipo, idPatrocinador)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async inscribirEnCategoria(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            EquiposModel.inscribirEnCategoria(idEquipo, idCategoria)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async eliminarInscripcion(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            EquiposModel.eliminarInscripcion(idEquipo, idCategoria)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrarCategoriasInscritas(idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarCategoriasInscritas(idEquipo)
                .catch((err) => reject(err))
                .then((inscripciones) => resolve(inscripciones));
        });
    }

    async mostrarEquipo(equipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarEquipoPorNombre(equipo)
                .catch((err) => reject(err))
                .then((equipo) => resolve(equipo));
        });
    }

    async mostrar() {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrar()
                .catch((err) => reject(err))
                .then((equipos) => resolve(equipos));
        });
    }

    async eliminar(idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.eliminar(idEquipo)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrarEquiposPorCategoria(idCategoria) {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarEquiposPorCategoria(idCategoria)
                .catch((err) => reject(err))
                .then((equipos) => resolve(equipos));
        });
    }

    async editar(idEquipo, equipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.editar(idEquipo, equipo)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    async mostrarInscripciones() {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarInscripciones()
                .catch((err) => reject(err))
                .then((categorias) => {
                    const equipos = [];
                    let ultima_categoria = 0;

                    for (const cat of categorias) {
                        const { categoria, equipo } = cat;

                        if (!equipos.length) {
                            equipos.push({
                                categoria,
                                equipos: [equipo]
                            });
                        } else if (categoria === equipos[ultima_categoria].categoria) {
                            equipos[ultima_categoria].equipos.push(equipo);
                        } else {
                            ultima_categoria++;
                            equipos.push({
                                categoria,
                                equipos: [equipo]
                            });
                        }
                    }

                    resolve(equipos);
                });
        });
    }
}


module.exports = new EquiposController();
