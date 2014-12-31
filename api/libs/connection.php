<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");
function getConnection(){
	try{
		$db_username = "daniel";
		$db_password = "12345";
		$connection = new PDO("mysql:host=localhost;dbname=el_zapotal;charset=utf8",$db_username,$db_password);
		$connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		return $connection;
	}catch(PDOException $e){
		echo "Error: " . $e->getMessage();
	}
}

getConnection();

?>