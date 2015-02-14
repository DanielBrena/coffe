
module.controller('Entrada',function($scope,ServiceEntrada,ServiceCategoriaEntrada,$window){
$scope.entradas = {};
$scope.entrada = {};
$scope.categoria_entradas = {};
    /*
    Obtiene todos los entradas.

    */
    $scope.entrada_all = function(){
        ServiceEntrada.all().success(function(data){
            $scope.entradas = data.entradas;
        }).error(function(e){
            console.log(e);
        });
    }  

    //Ejecuta la funcion.
    $scope.entrada_all();

    /*
    Busca un entrada con el nombre.

    */
    $scope.entrada_findLike = function(){
        if($scope.entrada.busqueda != "" ){
            console.log($scope.entrada.busqueda);
            ServiceEntrada.findLike($scope.entrada.busqueda).success(function(data){
                $scope.entradas = data.entradas;
            });
        }else{
          $scope.entrada_all();
        }
    }

    /*
    Cargar informacion de un
    entrada.
    */
    $scope.entrada_loadId = function(id){
        $scope.categoria_entrada_all();
        ServiceEntrada.loadId(id).success(function(data){
            $scope.entrada = data;
            $scope.entrada.ent_valor = parseInt( data.ent_valor );
            $scope.entrada.categoria_entrada_ce_id = data.categoria_entrada_ce_id;
            console.log(data.categoria_entrada_ce_id);
            var_entrada.pushPage('crear.html', { animation : 'lift' } );
        });
    }

    /*
    Agregar o actualizar un
    entrada.
    */
    $scope.entrada_add = function(){

        if( $scope.entrada.ent_id != null){
            //$scope.entrada.ent_valor = parseInt( $scope.entrada.ent_valor );
            ServiceEntrada.update($scope.entrada).success(function(){
                alerta("Se actualizo el entrada.");
                $scope.entrada_all();
            });

        }else{
            $scope.entrada.usuario_usu_id = $window.localStorage.getItem("usuario");
            $scope.entrada.categoria_entrada_ce_id =   $scope.entrada.categoria_entrada_ce_id;
            
            ServiceEntrada.add($scope.entrada).success(function(){
                $scope.entrada_all();
                alerta("Se creo el entrada.");
            }).error(function(e){
                console.log(e);
            });
        }
    }

     /*
    Obtiene todos los categoria_entradas.

    */
    $scope.categoria_entrada_all = function(){
        ServiceCategoriaEntrada.all().success(function(data){

            $scope.categoria_entradas = data.categoria_entradas;
            $scope.entrada.categoria_entrada_ce_id = data.categoria_entradas[0].ce_id;
        }).error(function(e){
            console.log(e);
        });
    }  

    /*
    Evento al crear un entrada.
    */
    $scope.entrada_event = function(){
       
        $scope.entrada= {}; 
        $scope.categoria_entrada_all();
    }

    /*
    Eliminar un entrada.
    */
    $scope.entrada_delete = function(id){
        ons.notification.confirm({
          message: '¿ Deseas eliminar el entrada ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    ServiceEntrada.delete(id).success(function(data){
                      $scope.entrada_all();
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
