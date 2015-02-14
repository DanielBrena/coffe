<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/producto', function() use($app){
		$app->response->headers->set('Content-type','application/json');
		$app->response->header('Access-Control-Allow-Origin','*');

		$app->get('/all', function() use($app){
			$sql = "SELECT * FROM producto";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$productos = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("productos" => $productos));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/id/:id', function($id) use($app){
			$sql = "SELECT * FROM producto WHERE pro_id = :pro_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pro_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$producto = $stmt->fetchObject();
				$db = null;
				echo json_encode($producto);
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add', function() use($app){
			$request = $app->request();
			$id = uniqid();
            $fecha = date("Y-m-d");
			$producto = json_decode($request->getBody());
			$sql = "INSERT INTO producto (pro_id,pro_nombre,pro_descripcion,pro_img,pro_precio,pro_existe,pro_genera_iva,pro_fecha_creacion,categoria_producto_cp_id) VALUES (:pro_id,:pro_nombre,:pro_descripcion,:pro_img,:pro_precio,:pro_existe,:pro_genera_iva,:pro_fecha_creacion,:categoria_producto_cp_id)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pro_id',$id,PDO::PARAM_STR);
				$stmt->bindParam(':pro_nombre',$producto->pro_nombre,PDO::PARAM_STR);
				$stmt->bindParam(':pro_descripcion',$producto->pro_descripcion,PDO::PARAM_STR);
				$stmt->bindParam(':pro_img',$producto->pro_img,PDO::PARAM_STR);
				$stmt->bindParam(':pro_precio',$producto->pro_precio,PDO::PARAM_STR);
				$stmt->bindParam(':pro_existe',$producto->pro_existe,PDO::PARAM_STR);
				$stmt->bindParam(':pro_genera_iva',$producto->pro_genera_iva,PDO::PARAM_STR);
				$stmt->bindParam(':pro_fecha_creacion',$fecha,PDO::PARAM_STR);
				$stmt->bindParam(':categoria_producto_cp_id',$producto->categoria_producto_cp_id,PDO::PARAM_STR);
				$stmt->execute();
				$producto->pro_id = $db->lastInsertId();
				$db = null;
				echo json_encode($producto);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->get('/like/:like', function($like) use($app){
			$sql = "SELECT * FROM producto WHERE pro_nombre like :like";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
                $like = "%".$like."%";
                $stmt->bindParam(':like',$like,PDO::PARAM_STR);
				$stmt->execute();
				$productos = $stmt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("productos" => $productos));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});
		
		//falta where
		$app->put('/update', function() use($app){

			$request = $app->request();
			$producto = json_decode($request->getBody());
			$sql = "UPDATE producto SET pro_nombre = :pro_nombre, pro_descripcion=:pro_descripcion,pro_img=:pro_img,pro_precio=:pro_precio,pro_existe=:pro_existe,pro_genera_iva=:pro_genera_iva,pro_fecha_creacion=:pro_fecha_creacion,categoria_producto_cp_id=:categoria_producto_cp_id WHERE pro_id = :pro_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pro_id',$producto->pro_id,PDO::PARAM_STR);
				$stmt->bindParam(':pro_nombre',$producto->pro_nombre,PDO::PARAM_STR);
				$stmt->bindParam(':pro_descripcion',$producto->pro_descripcion,PDO::PARAM_STR);
				$stmt->bindParam(':pro_img',$producto->pro_img,PDO::PARAM_STR);
				$stmt->bindParam(':pro_precio',$producto->pro_precio,PDO::PARAM_STR);
				$stmt->bindParam(':pro_existe',$producto->pro_existe,PDO::PARAM_STR);
				$stmt->bindParam(':pro_genera_iva',$producto->pro_genera_iva,PDO::PARAM_STR);
				$stmt->bindParam(':pro_fecha_creacion',$producto->pro_fecha_creacion,PDO::PARAM_STR);
				$stmt->bindParam(':categoria_producto_cp_id',$producto->categoria_producto_cp_id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($producto);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',function($id) use($app){
			$sql = "DELETE FROM producto WHERE pro_id = :pro_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':pro_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>