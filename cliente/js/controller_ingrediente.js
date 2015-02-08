module.controller('Ingrediente',function($scope,$http){
	$scope.btn_visible = "none";
	$scope.url = "http://localhost:8888/coffe/api/api/ingrediente/";
	$scope.ingrediente ={};
	$scope.ingredientes = {}

    

	$scope.getAll = function(){
        
        $http.get($scope.url + "all")
            .success(function(data){
                console.log(data);
                $scope.ingredientes = data.ingredientes;
            })
            .error(function(data){
                console.log(data);
            });
    }

    $scope.getAll();

    $scope.newIngrediente = function(){
        $scope.btn_visible = "none";
        
        $scope.ingrediente= {};
        $scope.ingrediente.ing_existe = "1";
        //$scope.renderDetails( $scope.categoria );
        
    };

    $scope.add = function(){
        console.log($scope.ingrediente);
          
        if( $scope.ingrediente.ing_id != null){

            $http.put($scope.url + "update/" + $scope.ingrediente.ing_id ,$scope.ingrediente)
            .success(function(data){
                $scope.ingrediente.ing_id = data.ing_id;
                $scope.getAll();
                $scope.btn_visible = "block";

            })
            .error(function(data){
                console.log(data);
            });

        }else{

            $http.post($scope.url + "add",$scope.ingrediente)
            .success(function(data){
                $scope.ingrediente.ing_id = data.ing_id;
                $scope.getAll();
                $scope.btn_visible = "block";

            })
            .error(function(data){
                console.log(data);
            });
        }
    };

    $scope.findLike = function(){
        if($scope.ingrediente.busqueda != "" ){
         
        console.log( $scope.ingrediente.busqueda );
            $http.get($scope.url + "like/" + $scope.ingrediente.busqueda)
                .success(function(data){
                    $scope.ingredientes = data.ingredientes;

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
                $scope.ingrediente = data;
                $scope.btn_visible = "block";
               
                var_ingrediente.pushPage('crear.html', { animation : 'lift' } );
            })
            .error(function(data){
                console.log(data);
            });
       
    };

    $scope.delete = function(){

        
        ons.notification.confirm({
          message: '¿ Deseas eliminar el ingrediente ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    $http.delete($scope.url + "delete/" + $scope.ingrediente.ing_id)
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
        var_ingrediente.popPage();
    };

});