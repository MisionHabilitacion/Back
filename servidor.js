//Tradicionalmente el import de xpress es 
//const express = require ('express');
//pero al poner (type= "module";) en el package.json podemos realizar la import como se realiza normalmente.
import Express from 'express';
import { MongoClient } from 'mongodb';

//crear string de conexión
const stringConexion = 'mongodb+srv://elimay:elimay415@pruebamisiontic.jdckl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//creación de instancia de mongoClient
const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let conexion;

const app = Express();
app.use(Express.json());
/*
app.delete('vtas/eliminar',(req, res) => {
   //revisar
  res.send(vtas);
})

app.patch ('vtas/actualizar', (req, res) => {
  //revisar
  res.send(vtas);
});*/

//Creación de vta
app.post('/vtas/nuevo', (req,res) => {
  console.log(req);
  const datosVta = req.body;
  console.log('llaves', Object.keys(datosVta));
  try{
    if(
    Object.keys(datosVta).includes("idVta") &&
    Object.keys(datosVta).includes("fecha") &&
    Object.keys(datosVta).includes("estado") && 
    Object.keys(datosVta).includes("vendedor") &&
    Object.keys(datosVta).includes("cliente") &&
    Object.keys(datosVta).includes("tipoIdCliente") &&
    Object.keys(datosVta).includes("idCliente") &&
    Object.keys(datosVta).includes("producto") &&
    Object.keys(datosVta).includes( "idPcto") &&
    Object.keys(datosVta).includes("cantidad") &&
    Object.keys(datosVta).includes("subTotal") &&
    Object.keys(datosVta).includes("total") 
    ){
      conexion.collection('vtas').insertOne(datosVta, (err,result) => {
        if(err){
          console.error(err);
          res.sendStatus(500);
        }else{
          console.log(result);
          res.sendStatus(200);
        }
      });
    }else{
      res.sendStatus(500);
    }
  }catch{
    res.sendStatus(500);
  }
  /*console.log('vta registrada', req.body);
  console.log('esta es una solicitud post a vtas/nuevo')
  res.send('vta registrada');*/
});

//solicitud de info de vtas a base de datos
app.get('/vtas', (req, res) => {
  console.log('alguien hizo get en la ruta vtas');
  conexion.collection('vtas').find({}).limit(50).toArray((err,result)=>{
    if(err){
      res.status(500).send('Error en consulta de ventas');
    }else{
      res.json(result);
    }
  });
});

const main = () => {
  client.connect((err, db)=>{
    if(err){
      console.error('Error conectando a la base de datos');
    }
    conexion = db.db('rookies');
    console.log('conexion exitosa');
    return app.listen(5000, ()=>{
      console.log('escuchando puerto 5000');
    });
  });
  
};

main();