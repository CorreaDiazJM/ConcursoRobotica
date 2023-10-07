const categorias = require('../controllers/categorias');
const CategoriasController = require('../controllers/categorias');
const { v4: uuidv4 } = require('uuid');

let participantes = [
    {
        "id": "7a7ad51a-5c93-4c57-9f76-e0e107d5cb00",
        "integrantes": [
            "José",
            "Ricardo"
        ],
        "categorias": [
            "1086505e-72f1-4686-bf2f-d1a2d4a2555a",
            "de6b0173-d57b-4853-bbd0-0351c7f2321a",
            "85d3b5c4-0385-4551-8ad5-9864def765d8"
        ]
    },
    {
        "id": "61166d60-635a-4612-abb6-6c57361a5eda",
        "integrantes": [
            "Jesus",
            "Juan"
        ],
        "categorias": [
            "1086505e-72f1-4686-bf2f-d1a2d4a2555a",
            "de6b0173-d57b-4853-bbd0-0351c7f2321a"
        ]
    }
];

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

    mostrarEquiposPorInscripcion(idCategoria) {
        if (CategoriasController.existeCategoria(idCategoria)) {
            let inscritos = [];
    
            for (const participante of participantes) {
                for (const categoria of participante.categorias) {
                    if (categoria === idCategoria) {
                        inscritos.push(participante);
                    }
                }
            }

            return inscritos;
        }
    }

    eliminarInscripcion(idParticipante, idCategoria) {
        if (CategoriasController.existeCategoria(idCategoria)) {
            for (const participante of participantes) {
                if (participante.id === idParticipante) {
                    const index = participante.categorias.indexOf(idCategoria);
                    
                    if (index !== -1) {
                        participante.categorias.splice(index, 1);
                    }
                }
            }
        }
    }

    eliminar(idParticipante) {
        for (let i = 0; i < participantes.length; i++) {
            const participante = participantes[i];
            
            if (participante.id === idParticipante) {
                participantes.splice(i, 1);
            }
        }
    }

    existeParticipante(idParticipante) {
        let existe = false;

        for (const participante of participantes) {
            if (participante.id === idParticipante) {
                existe = true;
            }
        }

        return existe;
    }
}

module.exports = new ParticipantesController();
