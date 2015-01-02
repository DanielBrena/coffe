<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/categoria_producto', function() use($app){
		$app->response->headers->set('Content-type','application/json');
		

		$app->get('/all', function() use($app){
			$sql = "SELECT * FROM categoria_producto";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$categoria_productos = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("categoria_producto" => $categoria_productos));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/id/:id', function($id) use($app){
			$sql = "SELECT * FROM categoria_producto WHERE cp_id = :cp_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':cp_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$categoria_producto = $stmt->fetchObject();
				$db = null;
				echo json_encode($categoria_producto);
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add', function() use($app){
			$request = $app->request();
			$categoria_producto = json_decode($request->getBody());
			$sql = "INSERT INTO categoria_producto (cp_id,cp_nombre,cp_descripcion,cp_fecha_creacion) VALUES (:cp_id,:cp_nombre,:cp_descripcion,:cp_fecha_creacion)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':cp_id',$categoria_producto->cp_id,PDO::PARAM_STR);
				$stmt->bindParam(':cp_nombre',$categoria_producto->cp_nombre,PDO::PARAM_STR);
				$stmt->bindParam(':cp_descripcion',$categoria_producto->cp_descripcion,PDO::PARAM_STR);
				$stmt->bindParam(':cp_fecha_creacion',$categoria_producto->cp_fecha_creacion,PDO::PARAM_STR);
				$stmt->execute();
				$categoria_producto->cp_id = $db->lastInsertId();
				$db = null;
				echo json_encode($categoria_producto);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->put('/update/:id', function($id) use($app){

			$request = $app->request();
			$categoria_producto = json_decode($request->getBody());
			$sql = "UPDATE categoria_producto SET cp_nombre = :cp_nombre, cp_descripcion=:cp_descripcion, cp_fecha_creacion=:cp_fecha_creacion WHERE cp_id = :cp_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':cp_id',$id,PDO::PARAM_STR);
				$stmt->bindParam(':cp_nombre',$categoria_producto->cp_nombre,PDO::PARAM_STR);
				$stmt->bindParam(':cp_descripcion',$categoria_producto->cp_descripcion,PDO::PARAM_STR);
				$stmt->bindParam(':cp_fecha_creacion',$categoria_producto->cp_fecha_creacion,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($categoria_producto);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',function($id) use($app){
			$sql = "DELETE FROM categoria_producto WHERE cp_id = :cp_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':cp_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>