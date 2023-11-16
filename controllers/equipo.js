const EquiposModel = require('../models/equipo');


class EquiposController {
    insertar(equipo, idPatrocinador) {
        return new Promise((resolve, reject) => {
            EquiposModel.insertar(equipo, idPatrocinador)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    inscribirEnCategoria(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            EquiposModel.inscribirEnCategoria(idEquipo, idCategoria)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    eliminarInscripcion(idEquipo, idCategoria) {
        return new Promise((resolve, reject) => {
            EquiposModel.eliminarInscripcion(idEquipo, idCategoria)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    mostrarCategoriasInscritas(idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarCategoriasInscritas(idEquipo)
                .catch((err) => reject(err))
                .then((inscripciones) => resolve(inscripciones));
        });
    }

    mostrarEquipo(equipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarEquipoPorNombre(equipo)
                .catch((err) => reject(err))
                .then((equipo) => resolve(equipo));
        });
    }

    mostrar() {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrar()
                .catch((err) => reject(err))
                .then((equipos) => resolve(equipos));
        });
    }

    eliminar(idEquipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.eliminar(idEquipo)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }

    mostrarEquiposPorCategoria(idCategoria) {
        return new Promise((resolve, reject) => {
            EquiposModel.mostrarEquiposPorCategoria(idCategoria)
                .catch((err) => reject(err))
                .then((equipos) => resolve(equipos));
        });
    }

    editar(idEquipo, equipo) {
        return new Promise((resolve, reject) => {
            EquiposModel.editar(idEquipo, equipo)
                .catch((err) => reject(err))
                .then(() => resolve());
        });
    }
}


module.exports = new EquiposController();
