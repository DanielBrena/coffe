
module.controller('Producto',function($scope,ServiceProducto,ServiceCategoriaProducto){
$scope.productos = {};
$scope.producto = {};
    
    /*
    Obtiene todos los productos.

    */
    $scope.producto_all = function(){
        ServiceProducto.all().success(function(data){
            $scope.productos = data.productos;
        }).error(function(e){
            console.log(e);
        });
    }  

    //Ejecuta la funcion.
    $scope.producto_all();

    /*
    Busca un producto con el nombre.

    */
    $scope.producto_findLike = function(){
        if($scope.producto.busqueda != "" ){
            ServiceProducto.findLike($scope.producto.busqueda).success(function(data){
                $scope.productos = data.productos;
            });
        }else{
          $scope.producto_all();
        }
    }

    /*
    Cargar informacion de un
    producto.
    */
    $scope.producto_loadId = function(id){
        $scope.categoria_producto_all();
        ServiceProducto.loadId(id).success(function(data){
            $scope.producto = data;
            $scope.producto.pro_precio = parseInt( data.pro_precio );
            
            var_producto.pushPage('crear.html', { animation : 'lift' } );
        });
    }

    /*
    Agregar o actualizar un
    producto.
    */
    $scope.producto_add = function(){

        if( $scope.producto.pro_id != null){
            $scope.producto.pro_precio = parseInt( $scope.producto.pro_precio );
            ServiceProducto.update($scope.producto).success(function(){
                alerta("Se actualizo el producto.");
                $scope.producto_all();
            });

        }else{
            ServiceProducto.add_producto($scope.producto).success(function(){
                $scope.producto_all();
                alerta("Se creo el producto.");
            }).error(function(e){
                console.log(e);
            });
        }
    }

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

    /*
    Evento al crear un producto.
    */
    $scope.producto_event = function(){
        $scope.categoria_producto_all();
        $scope.producto= {};
        $scope.producto.pro_existe = "1";
        $scope.producto.pro_genera_iva = "1";
    }

    /*
    Eliminar un producto.
    */
    $scope.producto_delete = function(id){
        ons.notification.confirm({
          message: '¿ Deseas eliminar el producto ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    ServiceProducto.delete(id).success(function(data){
                      $scope.producto_all();
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
