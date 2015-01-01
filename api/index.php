<?php 


require "../vendor/autoload.php";

$app = new \Slim\Slim(array(
	'debug' => true
));

define("SPECIALCONSTANT", true);



require 'libs/connection.php';

require "routes/api.php";

$app->run();
// $app->get('/',function(){
// 	echo "Bienvenido";
// });

// $app->get('/mesas','getMesas'  );

// 

// function getMesas() {
// 	$sql = "SELECT * FROM mesa";
// 	try{
// 		$db = getConnection();
// 		$smt = $db->query($sql);
// 		$mesas = $smt->fetchAll(PDO::FETCH_OBJ);
// 		$db = null;
// 		//echo '{"mesas": ' . json_encode($mesas) . '}';
// 		echo json_encode(array("mesas" => $mesas));
// 	}
// 	catch(PDOException $e){
// 		echo json_encode(array("error" => array("text" => $e->getMessage())));
// 	}

// 	//echo json_encode(array("text" => array("hola" => 1)));
// }

?>