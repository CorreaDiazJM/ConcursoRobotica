const { v4: uuidv4 } = require('uuid');

let modalidades=[
    {
        id:"1",
        modalidad:"batalla de robots"
    },
    {
        id:"2",
        modalidad:"vehiculos autonomos"
    }
]

class ModalidadesController {
    insertar(modo) {
        modo.id = uuidv4();
        modalidades.push(modo)

    }

    categoria(categoria){

        if (categoria.categoria==="modalidad sumo" || categoria.categoria==="modalidad incapacidad") {
            categoria.modalidad="batalla de robots";
            categoria.id= uuidv4();
            modalidades.push(categoria);
        }   else {

                if (categoria.categoria==="seguidor de linea" || categoria.categoria==="recoleccion de objetos") {
                    categoria.modalidad="vehiculos autonomos";
                    categoria.id= uuidv4();
                    modalidades.push(categoria);
                }   else {

                        if (categoria.categoria==="el objetivo" || categoria.categoria==="el problema") {
                            categoria.modalidad="soluciones industriales";
                            categoria.id= uuidv4();
                            modalidades.push(categoria);
                        } else {
                            categoria.modalidad="sin modalidad"
                            categoria.id= uuidv4();
                            modalidades.push(categoria)
                        }
                    } 
                    
        }

    }

    mostrar() {
        return modalidades
    }
}

module.exports = new ModalidadesController();
