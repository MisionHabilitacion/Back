//Tradicionalmente el import de xpress es 
//const express = require ('express');
//pero al poner (type= "module";) en el package.json podemos realizar la import como se realiza normalmente.
import Express from 'express';

const app = Express()

app.listen(5000, ()=>{
    console.log('escuchando puerto 5000');
});

app.get('vtas', (req,res) => {

    const vtas =[
        {
          _id: "v456",
          fecha: "4/2/21" ,
          estado: "Activo",
          vendedor: "Camilo Parra" , 
          idVendedor: "3276545",
          cliente: "Mirian medina" ,
          tipoIdCliente: 'cedula',
          idCliente: "cv002" ,
          producto: "Camisa Dama",
          idPcto: "cf342" , 
          cantidad: 4 ,
          precio: 3000,
          subTotal: 12000,
          total : 400000,
        } ,
        {
          _id: "v456",
          fecha: "4/2/21" ,
          estado: "Activo",
          vendedor: "Camilo Parra" , 
          idVendedor: "3276545",
          cliente: "Mirian medina" ,
          tipoIdCliente: 'cedula',
          idCliente: "cv002" ,
          producto: "Camisa Dama",
          idPcto: "cf342" , 
          cantidad: 4 ,
          precio: 3000,
          subTotal: 12000,
          total : 400000,
        } 
      ];
      res.send(vtas)


});