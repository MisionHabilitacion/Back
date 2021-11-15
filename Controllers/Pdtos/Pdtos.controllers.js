import { ObjectId } from 'mongodb';
import { getDB } from '../../Models/db';


//Creamos la función para consultar todos los productos de la base de datos
const consultarTodosProductos = async (callback) => {
	const DB = getDB();
	await DB.collection('Productos').find({}).toArray(callback);
};

//Función de actualización se recibe el id del producto y el body que se debe actualizar (Ejemplos los cuerpos esta en rutas)
const editarProducto = async (id, edicion, callback) => {
	const identificarProducto = { _id: new ObjectId(id) };
	const orden = {
		$set: edicion,
	};
	const DB = getDB();
	await DB
		.collection('Productos')
		.findOneAndUpdate(identificarProducto, orden, { upsert: true, returnOriginal: true }, callback);
};

//Función de eliminación se recibe el id del producto a eliminar.
const eliminarProducto = async (id, callback) => {
	const identificarProducto = { _id: new ObjectId(id) };
	const DB = getDB();
	await DB.collection('Productos').deleteOne(identificarProducto, callback);
};

//Función de creación se recibe el body que se debe incluir en la DB (Ejemplos los cuerpos esta en rutas)
const crearProducto = async (datosProducto, callback)=> {
	if (
		datosProducto.nom_producto &&
		datosProducto.descripcion &&
		datosProducto.valorU &&
		datosProducto.cantidad &&
		datosProducto.estado
	) {
		const DB = getDB();
		await DB.collection('Productos').insertOne(datosProducto, callback);
	} else {
		return 'Error no se puede insertar';
	}
};

//Exportamos las funciones a usar en rutas
export { consultarTodosProductos, editarProducto, eliminarProducto, crearProducto };