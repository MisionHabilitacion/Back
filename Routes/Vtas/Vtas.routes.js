import Express from 'express';
import {
	consultarTodosVentas,
	editarVenta,
	eliminarVenta,
	agregarVenta,
} from '../../Controllers/Vtas/Vtas.controller';

//Definimos la variable para usar las rutas de Express
const VtasRoutes = Express.Router();

//Creamos una función estandarizada para las respuestas hacia el FrontEnd
const AllCallback = (res) => (err, result) => {
	if (err) {
		res.status(500).send('Error en operacion con los Productos');
	} else {
		res.json(result);
	}
};

//Definimos la ruta a usar para el metodo GET en ventas, 
//y que se pueda obtener todas las ventas de MongoDB
VtasRoutes.route('/ventas').get((req, res) => {
	consultarTodosVentas(AllCallback(res));
});

/*Definimos la ruta a usar para el metodo PATCH en ventas,
* esto para realizar la actualización de una venta en especifico
* Se envia un request con el id que se quiere actualizar 
* asi como los datos a cambiar en la DB
* el cuerpo seria como el siguiente:
* data: {
*		"id_cliente": "10123654789",
*		"nom_cliente": "Cliente1",
*		"id_vendedor": "10478912365",
*		"nom_vendedor": "Vendedor1",
*		"id_producto": "XXXXXXXXXXXX",
*		"nom_producto": "Camiseta elegante",
*		"cantidad": 2,
*		"v_unitario": 80000,
*		"v_total": 160000
*	}
* la respuesta se procesa con la función AllCallback 
* que retorna al FrontEnd el estado de la solicitud
*/
VtasRoutes.route('/ventas/:id').patch((req, res) => {
	editarVenta(req.params.id, req.body, (AllCallback(res)));
});

/*Definimos la ruta a usar para el metodo DELETE en ventas, 
* esto para realizar la eliminación de una venta en especifico
* Se envia un request con el id que se desea eliminar
* la respuesta se procesa con la función AllCallback 
* que retorna al FrontEnd el estado de la solicitud
*/
VtasRoutes.route('/ventas/:id').delete((req, res) => {
	eliminarVenta(req.params.id, AllCallback(res));
});

/*Definimos la ruta a usar para el metodo POST en ventas,
* esto para realizar la creación de la nueva venta
* Se envia un request con los datos a insertar en la DB
* el cuerpo seria como el siguiente:
* data: {
*		"id_cliente": "10123654789",
*		"nom_cliente": "Cliente1",
*		"id_vendedor": "10478912365",
*		"nom_vendedor": "Vendedor1",
*		"id_producto": "XXXXXXXXXXXX",
*		"nom_producto": "Camiseta elegante",
*		"cantidad": 2,
*		"v_unitario": 80000,
*		"v_total": 160000
*	}
* la respuesta se procesa con la función AllCallback 
* que retorna al FrontEnd el estado de la solicitud
*/
VtasRoutes.route('/ventas').post((req, res) => {
	agregarVenta(req.body, AllCallback(res));
});

//Se exporta la ruta para usarla posteriormente
export default VtasRoutes;
