<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/pedido_has_producto', function() use($app,$autentificacion){
		$app->response->headers->set('Content-Type','application/json');
		$app->response->header('Access-Control-Allow-Origin','*');

		$app->get('/all', function() use($app){
			$sql = "SELECT * FROM pedido_has_producto";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$pedido_has_producto = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("pedido_has_producto" => $pedido_has_producto));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		// $app->get('/id/:id', function($id) use($app){
		// 	$sql = "SELECT * FROM usuario WHERE usu_id = :usu_id ";
		// 	try{
		// 		$db = getConnection();
		// 		$stmt = $db->prepare($sql);
		// 		$stmt->bindParam(':usu_id',$id,PDO::PARAM_STR);
		// 		$stmt->execute();
		// 		$usuario = $stmt->fetchObject();
		// 		$db = null;
		// 		echo json_encode($usuario);
		// 	}
		// 	catch(PDOException $e){
		// 		echo json_encode(array("error" => array("text" => $e->getMessage())));
		// 	}
		// });

		$app->get('/pedido/:id',$autentificacion,function($id) use($app){
			//$sql = "SELECT * FROM pedido_has_producto WHERE pedido_ped_id = :id";
			$sql = "SELECT * FROM pedido_producto WHERE pedido_ped_id = :id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$pedido_has_producto = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("productos" => $pedido_has_producto));
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/total/:id',$autentificacion,function($id) use($app){
			$sql = "SELECT sum(pro_precio) total FROM pedido_producto WHERE pedido_ped_id = :id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$total = $stmt->fetchObject();
				$db = null;
				echo json_encode(array("total" => $total));
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add',$autentificacion, function() use($app){
			$request = $app->request();
			$id = uniqid();
			$estado = "0";
			$pedido_has_producto = json_decode($request->getBody());
			$sql = "INSERT INTO pedido_has_producto (pp_id,pedido_ped_id,producto_pro_id,pp_estado) VALUES (:pp_id,:pedido_ped_id,:producto_pro_id,:pp_estado)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pp_id',$id,PDO::PARAM_STR);
				$stmt->bindParam(':pedido_ped_id',$pedido_has_producto->pedido_ped_id,PDO::PARAM_STR);
				$stmt->bindParam(':producto_pro_id',$pedido_has_producto->producto_pro_id,PDO::PARAM_STR);
				$stmt->bindParam(':pp_estado',$estado,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				
				echo json_encode($pedido_has_producto);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->put('/update',$autentificacion, function() use($app){

			$request = $app->request();
			$pedido_has_producto = json_decode($request->getBody());
			$sql = "UPDATE pedido_has_producto SET pp_estado = '1' WHERE pp_id = :id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				//$stmt->bindParam(':pp_estado',$pedido_has_producto->pp_estado,PDO::PARAM_STR);
				$stmt->bindParam(':id',$pedido_has_producto->pp_id,PDO::PARAM_STR);
				
				$stmt->execute();
				$db = null;
				echo json_encode($pedido_has_producto);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',$autentificacion,function($id) use($app){
			$sql = "DELETE FROM pedido_has_producto WHERE pp_id = :id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>