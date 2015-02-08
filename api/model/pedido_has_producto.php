<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/pedido_has_producto', function() use($app){
		$app->response->headers->set('Content-Type','application/json');
		

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

		$app->get('/pedido/:id',function($id) use($app){
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

		$app->get('/total/:id',function($id) use($app){
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

		$app->post('/add', function() use($app){
			$request = $app->request();
			$pedido_has_producto = json_decode($request->getBody());
			$sql = "INSERT INTO pedido_has_producto (pedido_ped_id,producto_pro_id,pp_estado) VALUES (:pedido_ped_id,:producto_pro_id,:pp_estado)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pedido_ped_id',$pedido_has_producto->pedido_ped_id,PDO::PARAM_STR);
				$stmt->bindParam(':producto_pro_id',$pedido_has_producto->producto_pro_id,PDO::PARAM_STR);
				$stmt->bindParam(':pp_estado',$pedido_has_producto->pp_estado,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($pedido_has_producto);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->put('/update/:id1/:id2/', function($id1,$id2) use($app){

			$request = $app->request();
			$pedido_has_producto = json_decode($request->getBody());
			$sql = "UPDATE pedido_has_producto SET pp_estado = :pp_estado WHERE pedido_ped_id = :pedido_ped_id AND producto_pro_id = :producto_pro_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pp_estado',$pedido_has_producto->pp_estado,PDO::PARAM_STR);
				$stmt->bindParam(':pedido_ped_id',$pedido_has_producto->pedido_ped_id,PDO::PARAM_STR);
				$stmt->bindParam(':producto_pro_id',$pedido_has_producto->producto_pro_id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($pedido_has_producto);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id1/:id2',function($id1,$id2) use($app){
			$sql = "DELETE FROM pedido_has_producto WHERE pedido_ped_id = :pedido_ped_id AND producto_pro_id = :producto_pro_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pedido_ped_id',$id1,PDO::PARAM_STR);
				$stmt->bindParam(':producto_pro_id',$id2,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>