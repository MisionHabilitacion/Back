import Express from 'express';
import {
	consultarTodosProductos,
	crearProducto,
	editarProducto,
	eliminarProducto
} from '../../Controllers/Pdtos/Pdtos.controllers';

//Definimos la variable para usar las rutas de Express
const PdtosRoutes = Express.Router();

//Creamos una función estandarizada para las respuestas hacia el FrontEnd
const AllCallback = (res) => (err, result) => {
	if (err) {
		res.status(500).send('Error en operacion con los Productos');
	} else {
		res.json(result);
	}
};

//Definimos la ruta a usar para el metodo GET en productos, 
//esto para obtener todos los productos de MongoDB
PdtosRoutes.route('/productos').get((req, res) => {
	consultarTodosProductos(AllCallback(res));
});

/*Definimos la ruta a usar para el metodo PATCH en productos, 
*esto para realizar la actualización de un producto en especifico
* Se envia un request con el id que se quiere actualizar asi como los datos 
* a cambiar en la DB, el cuerpo seria como el siguiente:
* data: {
*		"nom_producto":"Camisa formal",
*		"descripcion": "Prueba Modificar",
*		"valorU": 50000,
*		"cantidad": 15,
*		"estado": "Disponible"
*	}
* la respuesta se procesa con la función Allcallback
* que retorna al FrontEnd el estado de la solicitud
*/
PdtosRoutes.route('/productos/:id').patch((req, res) => {
	editarProducto(req.params.id, req.body, (AllCallback(res)));
});

/*Definimos la ruta a usar para el metodo DELETE en productos, 
*esto para realizar la eliminación de un producto en especifico
* Se envia un request con el id que se desea eliminar
* la respuesta se procesa con la función Allcallback que retorna 
*al FrontEnd el estado de la solicitud
*/
PdtosRoutes.route('/productos/:id').delete((req, res) => {
	eliminarProducto(req.params.id, AllCallback(res));
});

/*Definimos la ruta a usar para el metodo POST en productos, 
 *esto para realizar la creación del nuevo producto
* Se envia un request con los datos a insertar en la DB
* el cuerpo seria como el siguiente:
* data: {
*		"nom_producto":"Camisa formal",
*		"descripcion": "Prueba Modificar",
*		"valorU": 50000,
*		"cantidad": 15,
*		"estado": "Disponible"
*	}
* la respuesta se procesa con la función Allcallback que retorna 
* al FrontEnd el estado de la solicitud
*/
PdtosRoutes.route('/productos').post((req, res) => {
	crearProducto(req.body, (AllCallback(res)));
});

//Se exporta la ruta para usarla posteriormente
export default PdtosRoutes;