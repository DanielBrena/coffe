<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/pedido', function() use($app,$autentificacion){
		$app->response->headers->set('Content-type','application/json');
		$app->response->header('Access-Control-Allow-Origin','*');

		

		$app->get('/all',$autentificacion, function() use($app){
			$fecha = date("Y-m-d");

			$sql = "SELECT * FROM pedido WHERE ped_fecha_creacion = date(:fecha) order by ped_id desc ";
			
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':fecha',$fecha,PDO::PARAM_STR);
				
				$stmt->execute();
				$pedidos = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("pedidos" => $pedidos));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/id/:id',$autentificacion, function($id) use($app){
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

		$app->get('/like/:like',$autentificacion, function($like) use($app){
			$sql = "SELECT * FROM pedido WHERE ped_codigo like :like";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
                $like = "%".$like."%";
                $stmt->bindParam(':like',$like,PDO::PARAM_STR);
				$stmt->execute();
				$pedidos = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("pedidos" => $pedidos));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add',$autentificacion, function() use($app){
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
				$pedido->ped_id = $id;
				$db = null;
				echo json_encode($pedido);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->put('/update',$autentificacion, function() use($app){

			$request = $app->request();
			$pedido = json_decode($request->getBody());
			$sql = "UPDATE pedido SET ped_pagado = '1' WHERE ped_id = :ped_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ped_id',$pedido->ped_id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($pedido);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',$autentificacion,function($id) use($app){
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