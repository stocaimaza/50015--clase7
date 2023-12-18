/*Clase 7 - Express Avanzado */

//Temas de hoy: 

//1) Codigos de estado. 
//2) ¿Que es una API?
//3) API Rest.
//4) Metodos de Peticion. 
//5) Postman. 
//6) Vemos la final del mundo otra vez. 

///////////////////////////////////////////////////////

//1) Codigos de estado: 

//Los mas utilizados: 

//200. Ok, la petición fue exitosa. 
//400. Bad request. La solicitud no pudo ser entendida por el servidor. 
//401. Unauthorized. Acceso no autorizado. 
//403. Forbidden. El servidor no puede responder a la solicitud del cliente porque sus credenciales no tienen autorización para este contenido. 
//404. Not found. Recurso no encontrado. 
//500. Internal Server Error.. Error interno del servidor. 

//2) ¿Que es una API? 
//API significa "Application Programming Interface" o "Interfaz de programación de aplicaciones".
//Es un conjunto de definiciones y reglas que permite que dos equipos puedan integrarse para trabajar juntos. La mejor analogía que hay para comprender que es una api es verlo como un "contrato" entre el front y el back. 

//Rest: permite definir la estructura que deben tener los datos para poder transferirse. 

//Los dos más utilizados: 
//JSON.
//XML. 

//¿Que caracteristicas debe tener una API Rest?
//1) Protocolo cliente/servidor sin estado. 
//2) Cacheable. 
//3) Operaciones comunes. 
//4) Interfaz uniforme. 
//5) Utilización de hipermedios. 


//Repasamos el get: 

const express = require("express");
const app = express();
const PUERTO = 8080;

//Sistema de gestión de clientes: 

const clientes = [
    {id: "1", nombre: "Lionel", apellido: "Messi"},
    {id: "2", nombre: "Fideo", apellido: "Di Maria"},
    {id: "3", nombre: "Dibu", apellido: "Martinez"},
    {id: "4", nombre: "Bati", apellido: "Gol"}
]

//1) Que la ruta raiz "/" me traiga todos los clientes. 

app.get("/", (req, res)=> {
    res.send(clientes);
})


//2) La ruta get "/:id" debera traer solo el cliente con el id seleccionado: 

app.get("/:id", (req, res)=> {
    let {id} = req.params;

    const buscado = clientes.find(cliente => cliente.id == id);

    if(buscado) {
        return res.send(buscado);
    } else {
        return res.send("No se encuentra el cliente con el ID");
    }
})


//POST: sirve para crear recursos. 
//3) Vamos a agregar un nuevo cliente: 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/", (req, res)=> {
    const clienteNuevo = req.body;

    clientes.push(clienteNuevo);
    console.log(clientes);
    res.send({status:"success", message: "Cliente creado"});
})

//4) La ruta put "/:id" deberá tomar un cliente y actualizarlo por los campos enviados desde el body. 

app.put("/:id", (req, res) => {
    const {id} = req.params;
    const {nombre, apellido} = req.body;

    //Una vez que yo tengo el ID tengo que buscarlo en mi Array de Clientes: 
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if(clienteIndex !== -1){
        //Si esto ocurre, quiere decir que lo encontré: 
        //Siguiente: actualizo los datos: 
        clientes[clienteIndex].nombre = nombre;
        clientes[clienteIndex].apellido = apellido;

        //Muestro mi array de clientes de forma actualizada: 
        console.log(clientes);

        res.send({status:"success", message: "Cliente actualizado"});
    } else {
        res.status(404).send({status: "error", message: "Cliente no encontrado"});
    }
})

//4) La ruta DELETE "/:id" deberá eliminar el cliente con el id indicado: 

app.delete("/:id", (req, res) => {
    const {id} = req.params;

    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);

    if(clienteIndex !== -1) {
        //Si el cliente existe, lo voy a eliminar. 
        clientes.splice(clienteIndex, 1);

        console.log(clientes);
        res.send({status:"success", message: "Cliente eliminado"});
    } else {
        res.status(404).send({status:"error", message: "Cliente no encontrado"});
    }
})





//No se olviden del "listen" para que escuche todas las rutas: 

app.listen(PUERTO, ()=> {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})