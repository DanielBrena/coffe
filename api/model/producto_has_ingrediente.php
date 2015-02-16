<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/producto_has_ingrediente', function() use($app,$autentificacion){
		$app->response->headers->set('Content-Type','application/json');
		$app->response->header('Access-Control-Allow-Origin','*');

		$app->get('/all',$autentificacion, function() use($app){
			$sql = "SELECT * FROM producto_has_ingrediente";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$producto_has_ingrediente = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("producto_has_ingrediente" => $producto_has_ingrediente));
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

		$app->get('/producto/:id',$autentificacion,function($id) use($app){
			$sql = "SELECT * FROM producto_has_ingrediente WHERE producto_pro_id = :id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$producto_has_ingrediente = $stmt->fetchObject();
				$db = null;
				echo json_encode($producto_has_ingrediente);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add',$autentificacion, function() use($app){
			$request = $app->request();
			$producto_has_ingrediente = json_decode($request->getBody());
			$sql = "INSERT INTO producto_has_ingrediente (producto_pro_id,ingrediente_ing_id) VALUES (:producto_pro_id,:ingrediente_ing_id)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':producto_pro_id',$producto_has_ingrediente->producto_pro_id,PDO::PARAM_STR);
				$stmt->bindParam(':ingrediente_ing_id',$producto_has_ingrediente->ingrediente_ing_id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($producto_has_ingrediente);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		// $app->put('/update/:id', function($id) use($app){

		// 	$request = $app->request();
		// 	$usuario = json_decode($request->getBody());
		// 	$sql = "UPDATE usuario SET usu_usuario = :usu_usuario, usu_contrasena=:usu_contrasena, usu_rol=:usu_rol WHERE usu_id = :usu_id";
		// 	try{
		// 		$db = getConnection();
		// 		$stmt = $db->prepare($sql);
		// 		$stmt->bindParam(':usu_id',$usuario->usu_id,PDO::PARAM_STR);
		// 		$stmt->bindParam(':usu_usuario',$usuario->usu_usuario,PDO::PARAM_STR);
		// 		$stmt->bindParam(':usu_contrasena',$usuario->usu_password,PDO::PARAM_STR);
		// 		$stmt->bindParam(':usu_rol',$usuario->usu_rol,PDO::PARAM_STR);
		// 		$stmt->bindParam(':usu_id',$id,PDO::PARAM_STR);
		// 		$stmt->execute();
		// 		$db = null;
		// 		echo json_encode($usuario);
		// 	}catch(PDOException $e){
		// 		echo json_encode(array("error" => array("text" => $e->getMessage()))); 
		// 	}
		// });

		$app->delete('/delete/:id1/:id2',$autentificacion,function($id1,$id2) use($app){
			$sql = "DELETE FROM producto_has_ingrediente WHERE producto_pro_id = :producto_pro_id AND ingrediente_ing_id = :ingrediente_ing_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':producto_pro_id',$id1,PDO::PARAM_STR);
				$stmt->bindParam(':ingrediente_ing_id',$id2,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>