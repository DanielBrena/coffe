<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/pedido', function() use($app){
		$app->response->headers->set('Content-type','application/json');
		$app->response->header('Access-Control-Allow-Origin','*');


		$app->get('/all', function() use($app){
			$sql = "SELECT * FROM pedido";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$pedidos = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("pedidos" => $pedidos));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/id/:id', function($id) use($app){
			$sql = "SELECT * FROM pedido WHERE ped_id = :ped_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pedi_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$pedido = $stmt->fetchObject();
				$db = null;
				echo json_encode($pedido);
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add', function() use($app){
			$request = $app->request();
			$id = uniqid();
            $fecha = date("Y-m-d");
            $pp = "0";
			$pedido = json_decode($request->getBody());
			$sql = "INSERT INTO pedido (ped_id,ped_codigo,ped_fecha_creacion,ped_pagado,usuario_usu_id) VALUES (:ped_id,:ped_codigo,:ped_fecha_creacion,:ped_pagado,:usuario_usu_id)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ped_id',$id,PDO::PARAM_STR);
				$stmt->bindParam(':ped_codigo',$pedido->ped_codigo,PDO::PARAM_STR);
				$stmt->bindParam(':ped_fecha_creacion',$fecha,PDO::PARAM_STR);
				$stmt->bindParam(':ped_pagado',$pp,PDO::PARAM_STR);
				$stmt->bindParam(':usuario_usu_id',$pedido->usuario_usu_id,PDO::PARAM_STR);
				$stmt->execute();
				$pedido->ped_id = $db->lastInsertId();
				$db = null;
				echo json_encode($pedido);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->put('/update', function() use($app){

			$request = $app->request();
			$pedido = json_decode($request->getBody());
			$sql = "UPDATE pedido SET ped_pagado = '1' WHERE ped_id = :ped_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
			//	$stmt->bindParam(':ped_pagado',$val,PDO::PARAM_STR);
				$stmt->bindParam(':ped_id',$pedido->ped_id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($pedido);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',function($id) use($app){
			$sql = "DELETE FROM pedido WHERE ped_id = :ped_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ped_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>