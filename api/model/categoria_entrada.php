<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/categoria_entrada', function() use($app){
		$app->response->headers->set('Content-type','application/json');
        $app->response->header('Access-Control-Allow-Origin','*');
		

		$app->get('/all', function() use($app){
            
            
			$sql = "SELECT * FROM categoria_entrada";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$categoria_entradas = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("categoria_entradas" => $categoria_entradas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/id/:id', function($id) use($app){
			$sql = "SELECT * FROM categoria_entrada WHERE ce_id = :ce_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ce_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$categoria_entrada = $stmt->fetchObject();
				$db = null;
				echo json_encode($categoria_entrada);
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});
        
        $app->get('/like/:like', function($like) use($app){
			$sql = "SELECT * FROM categoria_entrada WHERE ce_nombre like :like";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
                $like = "%".$like."%";
                $stmt->bindParam(':like',$like,PDO::PARAM_STR);
				$stmt->execute();
				$categoria_entradas = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("categoria_entradas" => $categoria_entradas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add', function() use($app){
			$request = $app->request();
			$categoria_entrada = json_decode($request->getBody());
			$id = uniqid();
            $fecha = date("Y-m-d");
			$sql = "INSERT INTO categoria_entrada (ce_id,ce_nombre,ce_descripcion,ce_fecha_creacion) VALUES (:ce_id,:ce_nombre,:ce_descripcion,:ce_fecha_creacion)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ce_id', $id /*$categoria_entrada->cp_id*/,PDO::PARAM_STR);
				$stmt->bindParam(':ce_nombre',$categoria_entrada->ce_nombre,PDO::PARAM_STR);
				$stmt->bindParam(':ce_descripcion',$categoria_entrada->ce_descripcion,PDO::PARAM_STR);
				$stmt->bindParam(':ce_fecha_creacion',$fecha,PDO::PARAM_STR);
				$stmt->execute();
				$categoria_entrada->ce_id = $id;
				$db = null;
				echo json_encode($categoria_entrada);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->put('/update', function() use($app){

			$request = $app->request();
			$categoria_entrada = json_decode($request->getBody());
			$sql = "UPDATE categoria_entrada SET ce_nombre = :ce_nombre, ce_descripcion=:ce_descripcion, ce_fecha_creacion=:ce_fecha_creacion WHERE ce_id = :ce_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ce_id',$categoria_entrada->ce_id,PDO::PARAM_STR);
				$stmt->bindParam(':ce_nombre',$categoria_entrada->ce_nombre,PDO::PARAM_STR);
				$stmt->bindParam(':ce_descripcion',$categoria_entrada->ce_descripcion,PDO::PARAM_STR);
				$stmt->bindParam(':ce_fecha_creacion',$categoria_entrada->ce_fecha_creacion,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($categoria_entrada);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',function($id) use($app){
			$sql = "DELETE FROM categoria_entrada WHERE ce_id = :ce_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ce_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($id);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>