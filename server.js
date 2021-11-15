//Tradicionalmente el import de xpress es 
//const express = require ('express');
//pero al poner (type= "module";) en el package.json podemos realizar la import como se realiza normalmente.
import Express from 'express';
import { MongoClient } from 'mongodb';
import Cors from 'cors';
import { connectDatabase } from './src/Models/db.js';
import dotenv from 'dotenv';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import UsuarioRoutes from './Routes/Usuarios/Usuario.routes'
import PdtosRoutes from './Routes/Pdtos/pdtos.routes';
import VtasRoutes from './Routes/Vtas/Vtas.routes';

//Nos permite usar los archivos .env para tener las rutas en otro lado no visibles en el repo
dotenv.config({ path: './.env' });

const port = process.env.PORT || 8080;

const app = Express();
app.use(Express.json());
app.use(Cors);

//Configuracion del api auth0

var jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://emay-creaciones1.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://misiontic2022ciclo3emayapp',
  issuer: 'https://emay-creaciones1.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

//Los middleware de las diferentes Endpoints del aplicativo
app.use(VtasRoutes);
app.use(PdtosRoutes);
app.use(UsuarioRoutes);


//Podemos inicializarlo con clases o con la siguiente funcion

const main = () => {
	return app.listen(process.env.PORT, () => {
	  console.log(`escuchando puerto ${process.env.PORT}`);
	});
  };

// Usamos la función de conectar a la base de datos y una vez exista conexión a la misma llama a la función principal
// para que el servidor puedas escuchar peticiones
connectDatabase(main);