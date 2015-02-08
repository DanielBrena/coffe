module.controller('CP',function($scope,$http){
	$scope.btn_visible = "none";
	$scope.url = "http://localhost:8888/coffe/api/api/categoria_producto/";
	$scope.cp ={};
	$scope.cps = {}

	$scope.getAll = function(){
        
        $http.get($scope.url + "all")
            .success(function(data){
                console.log(data);
                $scope.cps = data.categoria_productos;
            })
            .error(function(data){
                console.log(data);
            });
    }

    $scope.getAll();

    $scope.newCP = function(){
        $scope.btn_visible = "none";
        
        $scope.cp = {};
        //$scope.renderDetails( $scope.categoria );
        
    };

    $scope.add = function(){
        console.log($scope.cp);
          
        if( $scope.cp.cp_id != null){

            $http.put($scope.url + "update/" + $scope.cp.cp_id ,$scope.cp)
            .success(function(data){
                $scope.cp.cp_id = data.cp_id;
                $scope.getAll();
                $scope.btn_visible = "block";

            })
            .error(function(data){
                console.log(data);
            });

        }else{

            $http.post($scope.url + "add",$scope.cp)
            .success(function(data){
                $scope.cp.cp_id = data.cp_id;
                $scope.getAll();
                $scope.btn_visible = "block";

            })
            .error(function(data){
                console.log(data);
            });
        }
    };

    $scope.findLike = function(){
        if($scope.cp.busqueda != "" ){
         
        console.log( $scope.cp.busqueda );
            $http.get($scope.url + "like/" + $scope.cp.busqueda)
                .success(function(data){
                    $scope.cps = data.categoria_productos;

                })
                .error(function(data){
                    console.log(data);
                });
        }else{
            $scope.getAll();
        }
    };

    $scope.loadId = function(id){
        
        $http.get($scope.url + "id/"+ id)
            .success(function(data){
                $scope.cp = data;
                $scope.btn_visible = "block";
               
                cp.pushPage('crear.html', { animation : 'lift' } );
            })
            .error(function(data){
                console.log(data);
            });
       
    };

    $scope.delete = function(){

        
        ons.notification.confirm({
          message: '¿ Deseas eliminar la categoria ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    $http.delete($scope.url + "delete/" + $scope.cp.cp_id)
                    .success(function(data){
                        
                    $scope.btn_visible = "none";
                    $scope.getAll();
                    $scope.cerrar();

                    })
                    .error(function(data){
                        console.log(data);
                    });
                break;
            }
          }
        });
    
    };

    $scope.cerrar = function(){
        cp.popPage();
    };

});