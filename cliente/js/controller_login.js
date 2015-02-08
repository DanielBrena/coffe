module.controller('Login',function($scope,$http,$window){
	$scope.usuario = {};

    $scope.url = "http://localhost:8888/coffe/api/api/pedido/";
     $scope.pedido = {};
     $scope.todos_productos = {};

	$scope.login = function(){
     console.log($scope.usuario.usu_usuario);
    
        $http.post("http://localhost:8888/coffe/api/api/usuario/login",$scope.usuario)
        .success(function(data){
            console.log(data);
            if(data.login){
                
                if(data.usuario.usu_rol == 1){
                    page.pushPage("admin.html",{animation:"slide"});
                    localStorage.setItem("usuario_id",data.usuario.usu_id);
                }else{
                    $alert();
                }
                
                
            }else{
                $scope.alert();
            }
            
        })
        .error(function(){
            
        });
    };

	$scope.crear = function(){
      
      $scope.pedido.usuario_usu_id = localStorage.getItem("usuario_id");
      $http.post($scope.url + "add",$scope.pedido)
            .success(function(data){
                $scope.pedido.ped_id = data.ped_id;
                dialog.hide();

            })
            .error(function(data){
                console.log(data);
            });
    };

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
    

	$scope.logout = function(){
        page.popPage();   
        localStorage.clear();
    }
    
            
            
    $scope.alert = function() {
        ons.notification.alert({message: 'Correo o Contraseña incorrecta'});
    }
});