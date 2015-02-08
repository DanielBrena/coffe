module.controller('Admin',function($scope,$http){
    $scope.url = "http://localhost:8888/coffe/api/api/pedido/";
    $scope.pedidos = {};
    $scope.productos = {};
    $scope.total;
    $scope.todos_productos = {};

    $scope.getAll = function(){
        
        $http.get($scope.url + "all")
            .success(function(data){
                console.log(data);
                $scope.pedidos = data.pedidos;
            })
            .error(function(data){
                console.log(data);
            });
    }

    $scope.getAllProducto = function(id){
      $http.get("http://localhost:8888/coffe/api/api/pedido_has_producto/pedido/"+id)
            .success(function(data){
                console.log(data);
                $scope.productos = data.productos;
            })
            .error(function(data){
                console.log(data);
            });
    }

    $scope.getAllProductos = function(){
        console.log("productos");
        $http.get("http://localhost:8888/coffe/api/api/producto/all")
            .success(function(data){
                console.log(data);
                $scope.todos_productos = data.productos;
            })
            .error(function(data){
                console.log(data);
            });
    };

    $scope.getTotal = function(id){
      $http.get("http://localhost:8888/coffe/api/api/pedido_has_producto/total/"+id)
            .success(function(data){
                console.log(data);
                $scope.total = data.total;
            })
            .error(function(data){
                console.log(data);
            });
    }

    $scope.getAll();

    
  	$scope.logout = function() {
    	page.popPage();
  	};

  	$scope.show = function(dlg) {
      ons.createDialog(dlg).then(function(dialog) {
          dialog.show();
      });
    }

    $scope.alert = function(){
      ons.notification.alert({message: 'An error has occurred!'});
    }
    $scope.carga = function(id){
      $scope.getAllProducto(id);
      $scope.getTotal(id);
      var_pedido.pushPage("schedule.html",{animation:"slide"});
      console.log($scope.productos);
    }

});