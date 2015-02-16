<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/entrada', function() use($app,$autentificacion){
		$app->response->headers->set('Content-type','application/json');
		$app->response->header('Access-Control-Allow-Origin','*');

		$app->get('/all',$autentificacion, function() use($app){
			//$sql = "SELECT * FROM entrada";
			$sql = "select * from entrada join categoria_entrada on entrada.categoria_entrada_ce_id = categoria_entrada.ce_id order by entrada.ent_id desc";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$entradas = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("entradas" => $entradas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/id/:id',$autentificacion, function($id) use($app){
			$sql = "SELECT * FROM entrada WHERE ent_id = :ent_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ent_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$entrada = $stmt->fetchObject();
				$db = null;
				echo json_encode($entrada);
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add',$autentificacion, function() use($app){
			$request = $app->request();
			$id = uniqid();
            $fecha = date("Y-m-d");
			$entrada = json_decode($request->getBody());
			$sql = "INSERT INTO entrada (ent_id,ent_valor,ent_fecha_creacion,usuario_usu_id,categoria_entrada_ce_id) VALUES (:ent_id,:ent_valor,:ent_fecha_creacion,:usuario_usu_id,:categoria_entrada_ce_id)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ent_id',$id,PDO::PARAM_STR);
				$stmt->bindParam(':ent_valor',$entrada->ent_valor,PDO::PARAM_STR);
				$stmt->bindParam(':ent_fecha_creacion',$fecha,PDO::PARAM_STR);
				$stmt->bindParam(':usuario_usu_id',$entrada->usuario_usu_id,PDO::PARAM_STR);
				$stmt->bindParam(':categoria_entrada_ce_id',$entrada->categoria_entrada_ce_id,PDO::PARAM_STR);
				
				$stmt->execute();
				$entrada->ent_id = $db->lastInsertId();
				$db = null;
				echo json_encode($entrada);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->get('/like/:like',$autentificacion, function($like) use($app){
			//$sql = "SELECT * FROM entrada WHERE pro_nombre like :like";
			$sql = "SELECT * FROM entrada join categoria_entrada on entrada.categoria_entrada_ce_id = categoria_entrada.ce_id WHERE categoria_entrada.ce_nombre like :like";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
                $like = "%".$like."%";
                $stmt->bindParam(':like',$like,PDO::PARAM_STR);
				$stmt->execute();
				$entradas = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("entradas" => $entradas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});
		
		//falta where
		$app->put('/update',$autentificacion, function() use($app){

			$request = $app->request();
			$entrada = json_decode($request->getBody());
			$sql = "UPDATE entrada SET ent_valor = :ent_valor, categoria_entrada_ce_id = :categoria_entrada_ce_id WHERE ent_id = :ent_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ent_id',$entrada->ent_id,PDO::PARAM_STR);
				$stmt->bindParam(':ent_valor',$entrada->ent_valor,PDO::PARAM_STR);
				
				$stmt->bindParam(':categoria_entrada_ce_id',$entrada->categoria_entrada_ce_id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($entrada);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',$autentificacion,function($id) use($app){
			$sql = "DELETE FROM entrada WHERE ent_id = :ent_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ent_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>