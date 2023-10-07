const ParticipantesController = require('./participantes');
const { v4: uuidv4 } = require('uuid');

let patrocinantes = [
    {
        "id": "89bb88d4-ebb4-4153-901c-f74947842420",
        "patrocinante": "Polar",
        "idParticipante": "7a7ad51a-5c93-4c57-9f76-e0e107d5cb00"
    },
    {
        "id": "b8e9d7d1-f090-4272-af4f-f4fad0fef168",
        "patrocinante": "La guacamaya",
        "idParticipante": "7a7ad51a-5c93-4c57-9f76-e0e107d5cb00"
    }
];


class PatrocinantesController {
    insertar(patrocinante, idParticipante) {
        if (ParticipantesController.existeParticipante(idParticipante)) {
            const id = uuidv4();
            patrocinantes.push({ id, patrocinante, idParticipante });
        }
    }

    mostrar() {
        return patrocinantes;
    }
}

module.exports = new PatrocinantesController();
