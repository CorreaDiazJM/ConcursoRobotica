const { v4: uuidv4 } = require('uuid');

let patrocinantes=[
    {
        id:"123",
        nombre:"polar",
        idEquipo:"66"
    },
    {
        id:"778",
        nombre:"jesus",
        idEquipo:"88"
    }
]

class PatrocinantesController {
    insertar(patrocinante) {
        console.log("probando")
        patrocinante.id = uuidv4();
        patrocinantes.push(patrocinante)
    }

    mostrar() {
        return patrocinantes;
    }
}

module.exports = new PatrocinantesController();
