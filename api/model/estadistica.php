<?php 
if(!defined("SPECIALCONSTANT")) die("Acceso Denegado");

	$app->group('/estadistica', function() use($app){
		$app->response->headers->set('Content-type','application/json');
		$app->response->header('Access-Control-Allow-Origin','*');

		$app->get('/week', function() use($app){

			$sql = "";
			$sql .= "select week(ped_fecha_creacion)Semana, sum(pro_precio) ";
			$sql .= "Total from pedido_producto where ";
			$sql .= "month(ped_fecha_creacion) = :month ";
			$sql .= "and year(ped_fecha_creacion) = :year group  by Semana ";

			$year = date('Y');
			$month = date('m');
			
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':year',$year,PDO::PARAM_STR);
				$stmt->bindParam(':month',$month,PDO::PARAM_STR);
				$stmt->execute();
				$estadisticas = $stmt->fetchAll(PDO::FETCH_OBJ);
				echo json_encode(array("estadisticas" => $estadisticas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});
		
		$app->get('/month', function() use($app){

			$sql = "";
			$sql .= "select case month(ped_fecha_creacion)  ";
			$sql .= "when '01' then 'Enero' ";
			$sql .= "when '02' then 'Febrero' ";
			$sql .= "when '03' then 'Marzo' ";
			$sql .= "when '04' then 'Abril' ";
			$sql .= "when '05' then 'Mayo' ";
			$sql .= "when '06' then 'Junio' ";
			$sql .= "when '07' then 'Julio' ";
			$sql .= "when '08' then 'Agosto' ";
			$sql .= "when '09' then 'Septiembre' ";
			$sql .= "when '10' then 'Octubre' ";
			$sql .= "when '11' then 'Noviembre' ";
			$sql .= "when '12' then 'Diciembre' ";
			$sql .= "end mes, ";
			$sql .= "ifnull(sum(pro_precio),0) Total ";
			$sql .= "from pedido_producto where  ";
			$sql .= "year(ped_fecha_creacion) = :year  ";
			$sql .= "group by month(ped_fecha_creacion) ";
			$year = date('Y');
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':year',$year,PDO::PARAM_STR);
				$stmt->execute();
				$estadisticas = $stmt->fetchAll(PDO::FETCH_OBJ);
				echo json_encode(array("estadisticas" => $estadisticas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});
		
		$app->get('/month/iva', function() use($app){

			$sql = "";
			$sql .= "select case month(ped_fecha_creacion)  ";
			$sql .= "when '01' then 'Enero' ";
			$sql .= "when '02' then 'Febrero' ";
			$sql .= "when '03' then 'Marzo' ";
			$sql .= "when '04' then 'Abril' ";
			$sql .= "when '05' then 'Mayo' ";
			$sql .= "when '06' then 'Junio' ";
			$sql .= "when '07' then 'Julio' ";
			$sql .= "when '08' then 'Agosto' ";
			$sql .= "when '09' then 'Septiembre' ";
			$sql .= "when '10' then 'Octubre' ";
			$sql .= "when '11' then 'Noviembre' ";
			$sql .= "when '12' then 'Diciembre' ";
			$sql .= "end mes, ";
			$sql .= "ifnull(sum(pro_precio),0) Total ";
			$sql .= "from pedido_producto where  ";
			$sql .= "year(ped_fecha_creacion) = :year  and pro_genera_iva = '1' ";
			$sql .= "group by month(ped_fecha_creacion) ";
			$year = date('Y');
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':year',$year,PDO::PARAM_STR);
				$stmt->execute();
				$estadisticas = $stmt->fetchAll(PDO::FETCH_OBJ);
				echo json_encode(array("estadisticas" => $estadisticas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/month/siniva', function() use($app){

			$sql = "";
			$sql .= "select case month(ped_fecha_creacion)  ";
			$sql .= "when '01' then 'Enero' ";
			$sql .= "when '02' then 'Febrero' ";
			$sql .= "when '03' then 'Marzo' ";
			$sql .= "when '04' then 'Abril' ";
			$sql .= "when '05' then 'Mayo' ";
			$sql .= "when '06' then 'Junio' ";
			$sql .= "when '07' then 'Julio' ";
			$sql .= "when '08' then 'Agosto' ";
			$sql .= "when '09' then 'Septiembre' ";
			$sql .= "when '10' then 'Octubre' ";
			$sql .= "when '11' then 'Noviembre' ";
			$sql .= "when '12' then 'Diciembre' ";
			$sql .= "end mes, ";
			$sql .= "ifnull(sum(pro_precio),0) Total ";
			$sql .= "from pedido_producto where  ";
			$sql .= "year(ped_fecha_creacion) = :year  and pro_genera_iva = '0' ";
			$sql .= "group by month(ped_fecha_creacion) ";
			$year = date('Y');
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':year',$year,PDO::PARAM_STR);
				$stmt->execute();
				$estadisticas = $stmt->fetchAll(PDO::FETCH_OBJ);
				echo json_encode(array("estadisticas" => $estadisticas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});		

		$app->get('/year', function() use($app){
			$sql = "";
			$sql .= "select  year(ped_fecha_creacion) anio, ";
			$sql .= "ifnull(sum(pro_precio),0) Total ";
			$sql .= "from pedido_producto group by  ";
			$sql .= "year(ped_fecha_creacion) order by anio desc ";
			
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				
				$stmt->execute();
				$estadisticas = $stmt->fetchAll(PDO::FETCH_OBJ);
				echo json_encode(array("estadisticas" => $estadisticas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/producto/year', function() use($app){

			$sql = "";
			$sql .= "select pro_nombre, count(*) Total from pedido_producto ";
			$sql .= "where year(ped_fecha_creacion) = :year ";
			$sql .= "group by pro_id ";
			$sql .= "order by Total desc ";

			$year = date('Y');
			
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':year',$year,PDO::PARAM_STR);
				$stmt->execute();
				$estadisticas = $stmt->fetchAll(PDO::FETCH_OBJ);
				echo json_encode(array("estadisticas" => $estadisticas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		$app->get('/producto/month', function() use($app){

			$sql = "";
			$sql .= "select pro_nombre, count(*) Total from pedido_producto ";
			$sql .= "where month(ped_fecha_creacion) = :month ";
			$sql .= "and year(ped_fecha_creacion) = :year group by pro_id ";
			$sql .= "order by Total desc ";

			$year = date('Y');
			$month = date('m');
			
			try{
				$db = getConnection();
				$stmt = $db->prepare($sql);
				$stmt->bindParam(':year',$year,PDO::PARAM_STR);
				$stmt->bindParam(':month',$month,PDO::PARAM_STR);
				$stmt->execute();
				$estadisticas = $stmt->fetchAll(PDO::FETCH_OBJ);
				echo json_encode(array("estadisticas" => $estadisticas));
			}
			catch(PDOException $e){
				echo json_encode(array("error" => array("text" => $e->getMessage())));
			}
		});

		
		

	});


?>