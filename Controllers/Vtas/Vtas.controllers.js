import { ObjectId } from 'mongodb';
import { getDB } from '../../Models/db';

//Creamos la función para consultar todas las ventas de la base de datos
const consultarTodosVentas = async (callback) => {
	const BD = getDB();
	await BD.collection('Ventas').find({}).toArray(callback);
};

//Función de actualización se recibe el id de la venta y el body que se debe actualizar (Ejemplos los cuerpos esta en rutas)
const editarVenta = async (id, edicion, callback) => {
	const identificarVenta = { _id: new ObjectId(id) };
	const orden = {
		$set: edicion,
	};
	const DB = getDB();
	await DB
		.collection('Ventas')
		.findOneAndUpdate(identificarVenta, orden, { upsert: true, returnOriginal: true }, callback);
};

//Función de eliminación se recibe el id de la venta a eliminar.
const eliminarVenta = async (id, callback) => {
	const identificarVenta = { _id: new ObjectId(id) };
	const DB = getDB();
	await DB.collection('Ventas').deleteOne(identificarVenta, callback);
};

//Función de creación se recibe el body que se debe incluir en la DB (Ejemplos los cuerpos esta en rutas)
const agregarVenta = async (datosVenta, callback) => {
	const DB = getDB();
	await DB
		.collection('Ventas')
		.insertOne(datosVenta, callback);
};

//Exportamos las funciones a usar en rutas
export { consultarTodosVentas, editarVenta, eliminarVenta, agregarVenta };
