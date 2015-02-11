module.controller('Admin',function($scope,ServicePedido,$window){
    $scope.pedidos = {};
    $scope.pedido = {};

    $scope.pedido_all = function(){
        ServicePedido.all().success(function(data){
            $scope.pedidos = data.pedidos;
        });
    }

    $scope.pedido_all();

    $scope.pedido_add = function(pedido){
      pedido.usuario_usu_id = $window.localStorage.getItem("usuario");
      ServicePedido.add(pedido).success(function(data){
        alerta("Se creo un pedido");
        $scope.pedido_all();

      });
    }

    $scope.pedido_productos = function(id){
      ServicePedido.loadProductosId(id).success(function(data){
        $window.localStorage.setItem("pedido", id);
        pedido_total(id);
        var_pedido.pushPage("pedido_productos.html",{animation:"slide"});
      });
    
    }

    $scope.pedido_findLike = function(){
      console.log($scope.pedido.busqueda);
      if($scope.pedido.busqueda != "" ){
        ServicePedido.findLike($scope.pedido.busqueda).success(function(data){
          $scope.pedidos = data.pedidos;
        });
      }else{
          $scope.pedido_all();
      }
    }

    $scope.pedido_delete = function(id){
      ons.notification.confirm({
          message: '¿ Deseas eliminar el pedido ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                   ServicePedido.delete(id).success(function(data){
                      $scope.pedido_all();
                    });
                break;
            }
          }
        });
    }

    $scope.pedido_deletePedidoStorage = function(){
        $window.localStorage.removeItem("pedido");
    }

    function pedido_total(id){
      ServicePedido.total(id).success(function(data){
        $scope.total = data.total;
      });
    }

    function alerta(m){
      ons.notification.alert({message: m});
    }

    $scope.pedido_pagar = function(pedido){
      ServicePedido.pagar(pedido).success(function(data){
        $scope.pedido_all();
      });
    }




});


/*module.controller('Admin',function($scope,$http){
    $scope.url = "http://localhost:8888/coffe/api/api/pedido/";
    $scope.pedidos = {};
    $scope.pedido = {};
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
    };
    $scope.getAll();

    $scope.crear = function(){
      
      $scope.pedido.usuario_usu_id = localStorage.getItem("usuario_id");

      $http.post($scope.url + "add",$scope.pedido)
            .success(function(data){
                $scope.pedido.ped_id = data.ped_id;
                //localStorage.setItem("pedido_id",data.ped_id);
               $scope.getAll();
                dialog.hide();
                console.log(data.ped_id);
               $scope.carga(data.ped_id);
               //$scope.pedido.ped_id = data.ped_id;


            })
            .error(function(data){
                console.log(data);
            });
      
    };

    $scope.delete = function(pp_id){
      ons.notification.confirm({
          message: '¿ Deseas eliminar el producto ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                    $http.delete("http://localhost:8888/coffe/api/api/pedido_has_producto/delete/"  +pp_id)
                    .success(function(data){
                        
                    $scope.getAllProducto(localStorage.getItem("pedido_id"));
                    $scope.getTotal(localStorage.getItem("pedido_id"));

                    })
                    .error(function(data){
                        console.log(data);
                    });
                break;
            }
          }
        });
    }

    $scope.entregar = function(pp_id){
      var pedido_has_producto = {};
      pedido_has_producto.pp_id = pp_id;
      $http.put("http://localhost:8888/coffe/api/api/pedido_has_producto/update",pedido_has_producto)
            .success(function(data){
                $scope.getAllProducto($scope.pedido.ped_id);


            })
            .error(function(data){
                console.log(data);
            });
    }

    $scope.pagar = function(ped_id){
      var pedido_ = {};
      pedido_.ped_id = ped_id;
      $http.put("http://localhost:8888/coffe/api/api/pedido/update",pedido_)
            .success(function(data){
                $scope.getAll();

            })
            .error(function(data){
                console.log(data);
            });
    }

    $scope.addProducto = function(){


      ons.createDialog('pro.html').then(function(dialog) {
        dialog.show();
        $scope.getAllProductos();
      });

    };

    $scope.add = function(pro_id){
      console.log(pro_id + " " + localStorage.getItem("pedido_id"));
      var pedido_has_producto = {};
      pedido_has_producto.pedido_ped_id = localStorage.getItem("pedido_id");
      pedido_has_producto.producto_pro_id = pro_id;
      pedido_has_producto.pp_estado = "0";
     
      $http.post("http://localhost:8888/coffe/api/api/pedido_has_producto/add",pedido_has_producto)
            .success(function(data){
                $scope.getAllProducto(localStorage.getItem("pedido_id"));
                $scope.getTotal(localStorage.getItem("pedido_id"));

            })
            .error(function(data){
                console.log(data);
            });
    };

    $scope.getAllProducto = function(id){
      $http.get("http://localhost:8888/coffe/api/api/pedido_has_producto/pedido/"+id)
            .success(function(data){
                console.log(data);
                $scope.productos = data.productos;
            })
            .error(function(data){
                console.log(data);
            });
    };

    $scope.getAllProductos = function(){
        console.log("productos");
        var_pedido.pushPage("addProducto.html",{animation:"lift"});
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
      localStorage.setItem("pedido_id",id);
    }

});*/