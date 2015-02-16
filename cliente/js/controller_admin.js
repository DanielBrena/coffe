module.controller('Admin',function($scope,ServicePedido,ServiceProducto,$window){
    $scope.pedidos = {};
    $scope.pedido = {};
    $scope.producto = {};

    /**
      Muestra todos los pedidos.
    */
    $scope.pedido_all = function(){
        ServicePedido.all().success(function(data){
            $scope.pedidos = data.pedidos;
        });
    }

    //Ejecuta la funcion.
    $scope.pedido_all();

    /**
      Agregar un pedido.
      @pedido Objeto pedido a insertar.
    */
    $scope.pedido_add = function(pedido){
      pedido.usuario_usu_id = $window.localStorage.getItem("usuario");
      ServicePedido.add(pedido).success(function(data){
        alerta("Se creo un pedido");
        $scope.pedido_all();
        $scope.pedido.ped_codigo = "";

      });
    }

    /**
      Muestra todos los productos
      de un pedido.
      @param id ID del pedido.
    */
    $scope.pedido_productos = function(id){
      ServicePedido.loadProductosId(id).success(function(data){
        $window.localStorage.setItem("pedido", id);

        pedido_total(id);
        var_pedido.pushPage("pedido_productos.html",{animation:"slide"});
        $scope.productos_pedido = data.productos;
      });
    
    }

    /**
      Busca un pedido mediante su codigo.

    */
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

    /**
      Busca un producto mediante su nombre.

    */

    $scope.producto_findLike = function(){
      console.log($scope.producto.busqueda);
      if($scope.producto.busqueda != "" ){
        ServiceProducto.findLike($scope.producto.busqueda).success(function(data){
          $scope.productos = data.productos;
        });
      }else{
          ServiceProducto.all().success(function(data){
           $scope.productos = data.productos;
          });
      }
    }

    /**
      Elemina un pedido

    */
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

    /*
      Elimina un pedido del localStorage.

    */
    $scope.pedido_deletePedidoStorage = function(){
        $window.localStorage.removeItem("pedido");
    }

    /*

    Calcula el total de un pedido.

    */
    function pedido_total(id){
      ServicePedido.total(id).success(function(data){
        $scope.total = data.total;
      });
    }

    /*
    Crea alertas.
    */
    function alerta(m){
      ons.notification.alert({message: m});
    }

    /*
    Acepta el pago del pedido.
    */
    $scope.pedido_pagar = function(pedido){
      ServicePedido.pagar(pedido).success(function(data){
        $scope.pedido_all();
      });
    }

    /*
    Cierra la sesion, elimina el localStorage.
    */
    $scope.logout = function(){
        page.popPage();
        $window.localStorage.removeItem("usuario");
        $window.localStorage.removeItem("sesion");
    }

    /*
    Evento para agregar productos.
    */
    $scope.producto_event = function(){
        ServiceProducto.all().success(function(data){
          $scope.productos = data.productos;
        });
        var_pedido.pushPage('producto_add.html',{animation:'lift'})
    }

    /*
    Agrega productos al pedido.
    */
    $scope.producto_add = function(pro_id){
      var pedido ={};
      pedido.pedido_ped_id = $window.localStorage.getItem("pedido");
      pedido.producto_pro_id = pro_id;

      ServiceProducto.add(pedido).success(function(data){
        alerta("Se agrego el producto");
        ServicePedido.loadProductosId( $window.localStorage.getItem("pedido") ).success(function(data){
           $scope.productos_pedido = data.productos;
          pedido_total( $window.localStorage.getItem("pedido") );
        });
      });
    }

    /*
    Elmina productos del pedido.
    */
    $scope.producto_eliminar = function(id){

      ons.notification.confirm({
          message: '¿ Deseas eliminar el producto ?',
          callback: function(idx) {
            switch(idx) {
             
              case 1:
                  ServiceProducto.delete(id).success(function(){
                     ServicePedido.loadProductosId( $window.localStorage.getItem("pedido") ).success(function(data){
                       $scope.productos_pedido = data.productos;
                        pedido_total( $window.localStorage.getItem("pedido") );
                    });
                  });
                break;
            }
          }
        });
    }

    /*
    Entrega los productos.
    */
    $scope.producto_entregar = function(id){
      var producto = {};
      producto.pp_id = id;
      ServiceProducto.entregar(producto).success(function(data){
        ServicePedido.loadProductosId( $window.localStorage.getItem("pedido") ).success(function(data){
          $scope.productos_pedido = data.productos;
             pedido_total( $window.localStorage.getItem("pedido") );
          });
      });
    }




});
