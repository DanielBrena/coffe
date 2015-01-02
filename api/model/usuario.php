<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/usuario', function() use($app){
		$app->response->headers->set('Content-type','application/json');
		

		$app->get('/all', function() use($app){
			$sql = "SELECT * FROM usuario";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$usuarios = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("usuarios" => $usuarios));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/id/:id', function($id) use($app){
			$sql = "SELECT * FROM usuario WHERE usu_id = :usu_id ";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':usu_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$usuario = $stmt->fetchObject();
				$db = null;
				echo json_encode($usuario);
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->post('/add', function() use($app){
			$request = $app->request();
			$usuario = json_decode($request->getBody());
			$sql = "INSERT INTO usuario (usu_id,usu_usuario,usu_contrasena,usu_rol) VALUES (:usu_id,:usu_usuario,:usu_contrasena,:usu_rol)";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':usu_id',$usuario->usu_id,PDO::PARAM_STR);
				$stmt->bindParam(':usu_usuario',$usuario->usu_usuario,PDO::PARAM_STR);
				$stmt->bindParam(':usu_contrasena',$usuario->usu_password,PDO::PARAM_STR);
				$stmt->bindParam(':usu_rol',$usuario->usu_rol,PDO::PARAM_STR);
				$stmt->execute();
				$usuario->usu_id = $db->lastInsertId();
				$db = null;
				echo json_encode($usuario);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->put('/update/:id', function($id) use($app){

			$request = $app->request();
			$usuario = json_decode($request->getBody());
			$sql = "UPDATE usuario SET usu_usuario = :usu_usuario, usu_contrasena=:usu_contrasena, usu_rol=:usu_rol WHERE usu_id = :usu_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':usu_id',$usuario->usu_id,PDO::PARAM_STR);
				$stmt->bindParam(':usu_usuario',$usuario->usu_usuario,PDO::PARAM_STR);
				$stmt->bindParam(':usu_contrasena',$usuario->usu_password,PDO::PARAM_STR);
				$stmt->bindParam(':usu_rol',$usuario->usu_rol,PDO::PARAM_STR);
				$stmt->bindParam(':usu_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
				echo json_encode($usuario);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

		$app->delete('/delete/:id',function($id) use($app){
			$sql = "DELETE FROM usuario WHERE usu_id = :usu_id";
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':usu_id',$id,PDO::PARAM_STR);
				$stmt->execute();
				$db = null;
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});

	});

 ?>