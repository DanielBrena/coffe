
module.controller('CategoriaEntrada',function($scope,ServiceCategoriaEntrada){
$scope.categoria_entrada = {};
$scope.categoria_entradas = {};
    
    /*
    Obtiene todos los categoria_entradas.

    */
    $scope.categoria_entrada_all = function(){
        ServiceCategoriaEntrada.all().success(function(data){
            $scope.categoria_entradas = data.categoria_entradas;
        }).error(function(e){
            console.log(e);
        });
    }  

    //Ejecuta la funcion.
    $scope.categoria_entrada_all();

    /*
    Busca un categoria_entrada con el nombre.

    */
    $scope.categoria_entrada_findLike = function(){
        if($scope.categoria_entrada.busqueda != "" ){
            ServiceCategoriaEntrada.like($scope.categoria_entrada.busqueda).success(function(data){
                $scope.categoria_entradas = data.categoria_entradas;
            });
        }else{
          $scope.categoria_entrada_all();
        }
    }

    /*
    Cargar informacion de un
    categoria_entrada.
    */
    $scope.categoria_entrada_loadId = function(id){
        ServiceCategoriaEntrada.loadId(id).success(function(data){
            $scope.categoria_entrada = data;
            var_categoria_entrada.pushPage('crear.html', { animation : 'lift' } );
        });
    }

    /*
    Agregar o actualizar un
    categoria_entrada.
    */
    $scope.categoria_entrada_add = function(){
        console.log($scope.categoria_entrada);
        if( $scope.categoria_entrada.ce_id != null){

            ServiceCategoriaEntrada.update($scope.categoria_entrada).success(function(){
                alerta("Se actualizo la categoria.");
                $scope.categoria_entrada_all();
            });

        }else{
            ServiceCategoriaEntrada.add($scope.categoria_entrada).success(function(){
                $scope.categoria_entrada_all();
                alerta("Se creo la categoria.");
            }).error(function(e){
                console.log(e);
            });
        }
    }

    /*
    Evento al crear un categoria_entrada.
    */
    $scope.categoria_entrada_event = function(){
        $scope.categoria_entrada= {};
    }

    /*
    Eliminar un categoria_entrada.
    */
    $scope.categoria_entrada_delete = function(id){
        ons.notification.confirm({
          message: '¿ Deseas eliminar la categoria ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    ServiceCategoriaEntrada.delete(id).success(function(data){
                      $scope.categoria_entrada_all();
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

