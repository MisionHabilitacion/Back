import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

//Preparamos para poder usar variables de entorno
dotenv.config({ path: './.env' });

//Creamos una variable para la conexión con la base de datos
const stringConexion = process.env.DB;
//creación de instancia de mongoClient
const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Definimos una variable global para usarla en la conexión
let database;

//Creamos una función para realizar la conexión con la base de datos y poder usarla desde nuestro servidor
const connectDatabase = (callback) => {
	//Creamos la conexión con el metodo connect del client mongo
	client.connect((err, db) => {
		if (err) {
			console.error('Error conectando a la base de datos');
			return 'error';
		}
		//Se conecta con la base de datos que definimos en la variable de entorno
		database = db.db(process.env.DB);
		console.log('Conexion exitosa a la base de datos');
		return callback();
	});
};

//Creamos un metodo get para poder usarlo desde otra parte del codigo
const getDB = () => {
	return database;
};

//Exportamos las dos funciones creadas
export { connectDatabase, getDB };