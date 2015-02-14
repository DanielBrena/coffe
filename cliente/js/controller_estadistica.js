module.controller('Estadistica',function($scope,ServiceEstadistica){

	function color(){
		return Math.floor( Math.random() * (255 -0) +1 ) +0;
	}

	
	$scope.estadistica_month = function(){
		ServiceEstadistica.month().success(function(data){
			console.log(data.estadisticas);

			var labels = new Array();
    		var datas = new Array();

			for(var i = 0; i < data.estadisticas.length; i++){
                    labels.push(data.estadisticas[i].mes);
                    datas.push(parseInt(data.estadisticas[i].Total));
                }
                var col  = "rgba(" + color() + "," + color() + "," + color();

                var barChartData = {
                    labels : labels,
                    datasets : [
                        {
                            fillColor : col + ",0.5)",
                            strokeColor : col + ",0.8)",
                            highlightFill: col + ",0.75)",
                            highlightStroke: col + ",1)",
                            data : datas
                        }
                        
                    ]

                };
                var ctx = document.getElementById("mensual").getContext("2d");
                    window.myBar = new Chart(ctx).Bar(barChartData, {
                        responsive : true
                 });


		});
	}

	$scope.estadistica_semanal = function(){
		ServiceEstadistica.week().success(function(data){
			var labels = new Array();
    		var datas = new Array();

			for(var i = 0; i < data.estadisticas.length; i++){
                    labels.push("Semana " + parseInt(data.estadisticas[i].Semana));
                    datas.push(parseInt(data.estadisticas[i].Total));
                }
                

                var col  = "rgba(" + color() + "," + color() + "," + color();

                var barChartData = {
                    labels : labels,
                    datasets : [
                        {
                            fillColor : col + ",0.5)",
                            strokeColor : col + ",0.8)",
                            highlightFill: col + ",0.75)",
                            highlightStroke: col + ",1)",
                            data : datas
                        }
                        
                    ]

                };
                var ctx = document.getElementById("semanal").getContext("2d");
                    window.myBar = new Chart(ctx).Bar(barChartData, {
                        responsive : true
                 });


		});
	}
	
	
	$scope.estadistica_anual = function(){
		ServiceEstadistica.year().success(function(data){
			var labels = new Array();
    		var datas = new Array();

			for(var i = 0; i < data.estadisticas.length; i++){
                    labels.push("Año " + parseInt(data.estadisticas[i].anio));
                    datas.push(parseInt(data.estadisticas[i].Total));
                }
                

                var col  = "rgba(" + color() + "," + color() + "," + color();

                var barChartData = {
                    labels : labels,
                    datasets : [
                        {
                            fillColor : col + ",0.5)",
                            strokeColor : col + ",0.8)",
                            highlightFill: col + ",0.75)",
                            highlightStroke: col + ",1)",
                            data : datas
                        }
                        
                    ]

                };
                var ctx = document.getElementById("anual").getContext("2d");
                    window.myBar = new Chart(ctx).Bar(barChartData, {
                        responsive : true
                 });


		});
	}

	$scope.estadistica_producto_month = function(){
		ServiceEstadistica.producto_month().success(function(data){
			console.log(data);
			var pieData = [];
			for(var i = 0; i < data.estadisticas.length; i++){
				var col  = "rgba(" + color() + "," + color() + "," + color();
				var obj = {};
				obj.value = data.estadisticas[i].Total;
				obj.color =  col + ",0.7)";
				obj.label = data.estadisticas[i].pro_nombre;
				obj.highlight = col + ",0.8)";
				pieData.push(obj);
			}
				
					

			var ctx = document.getElementById("producto_mensual").getContext("2d");
			window.myPie = new Chart(ctx).PolarArea(pieData, {
					responsive:true
				});
		});
	};

	$scope.estadistica_month();
	$scope.estadistica_producto_month();
	$scope.estadistica_semanal();
	$scope.estadistica_anual();
});