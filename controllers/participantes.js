const CategoriasController = require('./categorias');

let participantes = [];

class ParticipantesController {
    insertar(equipo) {
        /* insertar equipo */
    }

    editar(id, params) {
        /* editar equipo */
    }

    mostrarEquipos() {
        return participantes;
    }

    mostrarEquiposPorInscripcion(idEquipo, idCategoria) {
        let inscritos = [];

        equipos.find((equipo) => {
            if (equipo.id === idEquipo) {
                equipo.categorias.find((categoria) => {
                    if (categoria === idCategoria) {
                        inscritos.push(equipo);
                    }
                })
            }
        });

        return inscritos;
    }

    eliminarInscripcion(idEquipo, idCategoria) {
        participantes.find((equipo) => {
            if (equipo.id === idEquipo) {
                equipo.categorias.find((categoria, i) => {
                    if (categoria === idCategoria) {
                        equipo.categorias.splice(i, 1);
                    }
                });
            }
        });
    }
}

module.exports = new ParticipantesController();
