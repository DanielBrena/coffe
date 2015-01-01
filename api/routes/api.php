<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");
/*$app->get('/',function(){
	echo "Bienvenido";
});

$app->get('/mesas',function() use($app)
{


	$sql = "SELECT * FROM mesa";
	try{
		$db = getConnection();
		$smt = $db->query($sql);
		$mesas = $smt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		//echo '{"mesas": ' . json_encode($mesas) . '}';
		echo json_encode(array("mesas" => $mesas));
	}
	catch(PDOException $e){
		echo json_encode(array("error" => array("text" => $e->getMessage())));
	}

	//echo json_encode(array("text" => array("hola" => 1)));
});
*/
$app->get('/',function() use($app){
	$app->response->headers->set('Content-type','text/html');
	echo "Bienvenido a la API de Coffe";
});


$app->group('/api',function() use($app){
	$app->group('/usuarios', function() use($app){
		$app->response->headers->set('Content-type','application/json');
		

		$app->get('/all', function() use($app){
			$sql = "SELECT * FROM usuario";
			try{
				$db = getConnection();
				$smt = $db->query($sql);
				$mesas = $smt->fetchAll(PDO::FETCH_OBJ);
				$db = null;
				echo json_encode(array("usuarios" => $mesas));
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
				echo json_encode($usuario);
			}catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage()))); 
			}
		});


	});
});
 ?>