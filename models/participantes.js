const db = require('../database/connection');
const EquiposModel = require('../models/equipo');


class ParticipantesController {
    insertar(participante, idEquipo) {
        let existen = true;

        for (const idCategoria of categorias) {
            if (!CategoriasController.existeCategoria(idCategoria)) {
                existen = false;
            }
        }

        if (existen) {
            const id = uuidv4();
            participantes.push({ id, integrantes, categorias });
        }
    }

    editar(idParticipante, integrantes, categorias) {
        let existen = true;

        for (const idCategoria of categorias) {
            if (!CategoriasController.existeCategoria(idCategoria)) {
                existen = false;
            }
        }

        if (existen) {
            for (const participante of participantes) {
                if (participante.id === idParticipante) {
                    participante.integrantes = integrantes;
                    participante.categorias = categorias
                }
            }
        }
    }

    mostrar() {
        return participantes;
    }

    eliminar(idParticipante) {
        for (let i = 0; i < participantes.length; i++) {
            const participante = participantes[i];
            
            if (participante.id === idParticipante) {
                participantes.splice(i, 1);
            }
        }
    }
}


module.exports = new ParticipantesController();
