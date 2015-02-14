
module.controller('Ingrediente',function($scope,ServiceIngrediente){
$scope.ingredientes = {};
$scope.ingrediente = {};
    
    /*
    Obtiene todos los ingredientes.

    */
    $scope.ingrediente_all = function(){
        ServiceIngrediente.all().success(function(data){
            $scope.ingredientes = data.ingredientes;
        }).error(function(e){
            console.log(e);
        });
    }  

    //Ejecuta la funcion.
    $scope.ingrediente_all();

    /*
    Busca un ingrediente con el nombre.

    */
    $scope.ingrediente_findLike = function(){
        if($scope.ingrediente.busqueda != "" ){
            ServiceIngrediente.like($scope.ingrediente.busqueda).success(function(data){
                $scope.ingredientes = data.ingredientes;
            });
        }else{
          $scope.ingrediente_all();
        }
    }

    /*
    Cargar informacion de un
    ingrediente.
    */
    $scope.ingrediente_loadId = function(id){
        ServiceIngrediente.loadId(id).success(function(data){
            $scope.ingrediente = data;
            var_ingrediente.pushPage('crear.html', { animation : 'lift' } );
        });
    }

    /*
    Agregar o actualizar un
    ingrediente.
    */
    $scope.ingrediente_add = function(){

        if( $scope.ingrediente.ing_id != null){

            ServiceIngrediente.update($scope.ingrediente).success(function(){
                alerta("Se actualizo el ingrediente.");
                $scope.ingrediente_all();
            });

        }else{
            ServicioIngrediente.add($scope.ingrediente).success(function(){
                $scope.ingrediente_all();
                alerta("Se creo el ingrediente.");
            }).error(function(e){
                console.log(e);
            });
        }
    }

    /*
    Evento al crear un ingrediente.
    */
    $scope.ingrediente_event = function(){
        $scope.ingrediente= {};
        $scope.ingrediente.ing_existe = "1";
    }

    /*
    Eliminar un ingrediente.
    */
    $scope.ingrediente_delete = function(id){
        ons.notification.confirm({
          message: '¿ Deseas eliminar el ingrediente ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    ServiceIngrediente.delete(id).success(function(data){
                      $scope.ingrediente_all();
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

