<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

$app->get('/',function() use($app){
	$app->response->headers->set('Content-type','text/html');
	echo "Bienvenido a la API de Coffe";
});


$app->group('/api',function() use($app){
	
	require "model/usuario.php";
	require "model/categoria_producto.php";
	require "model/ingrediente.php";
	require "model/producto.php";
	require "model/producto_has_ingrediente.php";

});
 ?>