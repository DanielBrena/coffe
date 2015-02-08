<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/ingrediente', function() use($app){
		$app->response->headers->set('Content-type','application/json');
		

		$app->get('/all', function() use($app){
			$sql = "SELECT * FROM ingrediente";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$ingredientes = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("ingredientes" => $ingredientes));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/id/:id', function($id) use($app){
			$sql = "SELECT * FROM ingrediente WHERE ing_id = :ing_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ing_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$ingrediente = $stmt->fetchObject();
				$db = null;
				echo json_encode($ingrediente);
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/like/:like', function($like) use($app){
			$sql = "SELECT * FROM ingrediente WHERE ing_nombre like :like";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
                $like = "%".$like."%";
                $stmt->bindParam(':like',$like,PDO::PARAM_STR);
				$stmt->execute();
				$ingredientes = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("ingredientes" => $ingredientes));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add', function() use($app){
			$request = $app->request();
			$id = uniqid();
            $fecha = date("Y-m-d");
			$ingrediente = json_decode($request->getBody());
			$sql = "INSERT INTO ingrediente (ing_id,ing_nombre,ing_descripcion,ing_img,ing_fecha_creacion,ing_existe) VALUES (:ing_id,:ing_nombre,:ing_descripcion,:ing_img,:ing_fecha_creacion,:ing_existe)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ing_id',$id,PDO::PARAM_STR);
				$stmt->bindParam(':ing_nombre',$ingrediente->ing_nombre,PDO::PARAM_STR);
				$stmt->bindParam(':ing_descripcion',$ingrediente->ing_descripcion,PDO::PARAM_STR);
				$stmt->bindParam(':ing_img',$ingrediente->ing_img,PDO::PARAM_STR);
				$stmt->bindParam(':ing_fecha_creacion',$fecha,PDO::PARAM_STR);
				$stmt->bindParam(':ing_existe',$ingrediente->ing_existe,PDO::PARAM_STR);
				$stmt->execute();
				$ingrediente->ing_id = $db->lastInsertId();
				$db = null;
				echo json_encode($ingrediente);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->put('/update/:id', function($id) use($app){

			$request = $app->request();
			$ingrediente = json_decode($request->getBody());
			$sql = "UPDATE ingrediente SET  ing_nombre=:ing_nombre, ing_descripcion=:ing_descripcion, ing_img =:ing_img,
				ing_fecha_creacion=:ing_fecha_creacion, ing_existe = :ing_existe WHERE ing_id = :ing_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ing_id',$id,PDO::PARAM_STR);
				$stmt->bindParam(':ing_nombre',$ingrediente->ing_nombre,PDO::PARAM_STR);
				$stmt->bindParam(':ing_descripcion',$ingrediente->ing_descripcion,PDO::PARAM_STR);
				$stmt->bindParam(':ing_img',$ingrediente->ing_img,PDO::PARAM_STR);
				$stmt->bindParam(':ing_fecha_creacion',$ingrediente->ing_fecha_creacion,PDO::PARAM_STR);
				$stmt->bindParam(':ing_existe',$ingrediente->ing_existe,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($ingrediente);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',function($id) use($app){
			$sql = "DELETE FROM ingrediente WHERE ing_id = :ing_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':ing_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>