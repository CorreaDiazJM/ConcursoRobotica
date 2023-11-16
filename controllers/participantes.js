class ParticipantesController {
    insertar(integrantes, categorias) {
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
}

module.exports = new ParticipantesController();
