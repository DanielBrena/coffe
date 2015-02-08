module.controller('Producto',function($scope,$http){
	$scope.btn_visible = "none";
	$scope.url = "http://localhost:8888/coffe/api/api/producto/";
	$scope.producto ={};
	$scope.productos = {};

    $scope.categorias = {};

	$scope.getAll = function(){
        
        $http.get($scope.url + "all")
            .success(function(data){
                console.log(data);
                $scope.productos = data.productos;
            })
            .error(function(data){
                console.log(data);
            });
    };

    $scope.getAllCategoria = function(){
        
        $http.get("http://localhost:8888/coffe/api/api/categoria_producto/all")
            .success(function(data){
                
                $scope.categorias = data.categoria_productos;
                $scope.producto.categoria_producto_cp_id = data.categoria_productos[0].cp_id;

            })
            .error(function(data){
                console.log(data);
            });
    };

    $scope.getAll();
    $scope.getAllCategoria();

    $scope.newProducto = function(){
        $scope.btn_visible = "none";
        
        $scope.producto= {};
        $scope.producto.pro_existe = "1";
        $scope.producto.pro_genera_iva = "1";

        $scope.getAllCategoria();
        //$scope.renderDetails( $scope.categoria );
        
    };

    $scope.add = function(){
        console.log($scope.producto);
          
        if( $scope.producto.pro_id != null){

            $http.put($scope.url + "update/" + $scope.producto.pro_id ,$scope.producto)
            .success(function(data){
                $scope.producto.pro_id = data.pro_id;
                $scope.getAll();
                $scope.btn_visible = "block";

            })
            .error(function(data){
                console.log(data);
            });

        }else{
            $scope.producto.categoria_producto_cp_id = $scope.producto.categoria_producto_cp_id;
            $scope.producto.pro_precio = parseInt($scope.producto.pro_precio);
            $http.post($scope.url + "add",$scope.producto)
            .success(function(data){
                $scope.producto.pro_id = data.pro_id;
                $scope.getAll();
                $scope.btn_visible = "block";

            })
            .error(function(data){
                console.log(data);
            });
        }
    };

    $scope.findLike = function(){
        if($scope.producto.busqueda != "" ){
         
        console.log( $scope.producto.busqueda );
            $http.get($scope.url + "like/" + $scope.producto.busqueda)
                .success(function(data){
                    $scope.productos = data.productos;

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
                $scope.producto = data;
                $scope.producto.pro_precio = parseInt(data.pro_precio);
                $scope.btn_visible = "block";
               
                var_producto.pushPage('crear.html', { animation : 'lift' } );
            })
            .error(function(data){
                console.log(data);
            });
       
    };

    $scope.delete = function(){

        
        ons.notification.confirm({
          message: '¿ Deseas eliminar el producto ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    $http.delete($scope.url + "delete/" + $scope.producto.pro_id)
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
        var_producto.popPage();
    };

});