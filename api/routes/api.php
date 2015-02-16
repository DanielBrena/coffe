<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

$app->get('/',function() use($app){
	$app->response->headers->set('Content-type','text/html');
	echo "Bienvenido a la API de Coffe";
});

$autentificacion = function(){
    $app = \Slim\Slim::getInstance();
    $user = $app->request()->headers->get('HTTP_USER');
    $pass = $app->request()->headers->get('HTTP_PASS');
 
    $sql = "SELECT * FROM usuario WHERE usu_usuario = :usuario AND usu_contrasena = :contrasena";

    
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':usuario',$user,PDO::PARAM_STR);
        $stmt->bindParam(':contrasena',$pass,PDO::PARAM_STR);
        $stmt->execute();
        $isValid = $stmt->rowCount();
        if($isValid > 0){
            $isValid = true;
        }else{
            $isValid = false;   
        }
        $db = null;
        
        try{
            if(!$isValid){
                throw new Exception('Usuario o contrasena incorrectos');   
            }
        }catch(Exception $e){
             $app->status(401);
            echo json_encode(array(
                "status" => "error",
                "message" => $e->getMessage()
            ));  
            $app->stop();
        }
    }catch(PDOException $e){
        echo json_encode(array("error" => array("text" => $e->getMessage())));
        
    }
        
};

$app->group('/api',function() use($app,$autentificacion){
	
	require "model/usuario.php";
	require "model/categoria_producto.php";
	require "model/categoria_entrada.php";
	require "model/ingrediente.php";
	require "model/producto.php";
	require "model/entrada.php";
	require "model/producto_has_ingrediente.php";
	require "model/pedido.php";
	require "model/pedido_has_producto.php";
	require "model/estadistica.php";


});
 ?>