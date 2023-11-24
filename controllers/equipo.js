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

    async editar(idEquipo, equipo, idPatrocinador) {
        return new Promise((resolve, reject) => {
            EquiposModel.editar(idEquipo, equipo, idPatrocinador)
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
                        const { categoria, equipo, id_cat, id_equ } = cat;

                        if (!equipos.length) {
                            equipos.push({
                                id: id_cat,
                                categoria,
                                equipos: [{ equipo, id: id_equ }]
                            });
                        } else if (categoria === equipos[ultima_categoria].categoria) {
                            equipos[ultima_categoria].equipos.push({ equipo, id: id_equ });
                        } else {
                            ultima_categoria++;
                            equipos.push({
                                id: id_cat,
                                categoria,
                                equipos: [{ equipo, id: id_equ }]
                            });
                        }
                    }

                    console.log(equipos);

                    resolve(equipos);
                });
        });
    }

    async mostrarEquipoPorId(idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarEquipoPorId(idEquipo)
                .catch((err) => reject(err))
                .then((equipo) => resolve(equipo));
        });
    }
}


module.exports = new EquiposController();
