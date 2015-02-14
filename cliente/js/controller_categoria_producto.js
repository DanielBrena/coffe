
module.controller('CategoriaProducto',function($scope,ServiceCategoriaProducto){
$scope.categoria_producto = {};
$scope.categoria_productos = {};
    
    /*
    Obtiene todos los categoria_productos.

    */
    $scope.categoria_producto_all = function(){
        ServiceCategoriaProducto.all().success(function(data){
            $scope.categoria_productos = data.categoria_productos;
        }).error(function(e){
            console.log(e);
        });
    }  

    //Ejecuta la funcion.
    $scope.categoria_producto_all();

    /*
    Busca un categoria_producto con el nombre.

    */
    $scope.categoria_producto_findLike = function(){
        if($scope.categoria_producto.busqueda != "" ){
            ServiceCategoriaProducto.like($scope.categoria_producto.busqueda).success(function(data){
                $scope.categoria_productos = data.categoria_productos;
            });
        }else{
          $scope.categoria_producto_all();
        }
    }

    /*
    Cargar informacion de un
    categoria_producto.
    */
    $scope.categoria_producto_loadId = function(id){
        ServiceCategoriaProducto.loadId(id).success(function(data){
            $scope.categoria_producto = data;
            var_categoria_producto.pushPage('crear.html', { animation : 'lift' } );
        });
    }

    /*
    Agregar o actualizar un
    categoria_producto.
    */
    $scope.categoria_producto_add = function(){

        if( $scope.categoria_producto.cp_id != null){

            ServiceCategoriaProducto.update($scope.categoria_producto).success(function(){
                alerta("Se actualizo la categoria.");
                $scope.categoria_producto_all();
            });

        }else{
            ServiceCategoriaProducto.add($scope.categoria_producto).success(function(){
                $scope.categoria_producto_all();
                alerta("Se creo la categoria.");
            }).error(function(e){
                console.log(e);
            });
        }
    }

    /*
    Evento al crear un categoria_producto.
    */
    $scope.categoria_producto_event = function(){
        $scope.categoria_producto= {};
    }

    /*
    Eliminar un categoria_producto.
    */
    $scope.categoria_producto_delete = function(id){
        ons.notification.confirm({
          message: '¿ Deseas eliminar la categoria ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    ServiceCategoriaProducto.delete(id).success(function(data){
                      $scope.categoria_producto_all();
                    });
                break;
            }
          }
        });
    }

     /*
    Crea alertas.
    */
    function alerta(m){
      ons.notification.alert({message: m});
    }

});

