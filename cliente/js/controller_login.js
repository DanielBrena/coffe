
app.service("ServiceLogin",function(ServiceURL,$http){
    return {


        login : function(usuario){
       
            return $http.post(ServiceURL.usuario() + "/login",usuario);
        }
        
    }

});



module.controller('Login',function($scope,ServiceLogin,$window){

    $scope.login = function(usuario){
        ServiceLogin.login(usuario).success(function(data){
            console.log(data);
            $window.localStorage.setItem("usuario",data.usuario.usu_id);
        });  
    }

    $scope.logout = function(){
        $window.localStorage.removeItem("usuario");
    }

	// $scope.usuario = {};

 //    $scope.url = "http://localhost:8888/coffe/api/api/pedido/";
 //     $scope.pedido = {};
 //     $scope.todos_productos = {};

	// $scope.login = function(){
 //     console.log($scope.usuario.usu_usuario);
    
 //        $http.post("http://localhost:8888/coffe/api/api/usuario/login",$scope.usuario)
 //        .success(function(data){
 //            console.log(data);
 //            if(data.login){
                
 //                if(data.usuario.usu_rol == 1){
 //                    page.pushPage("admin.html",{animation:"slide"});
 //                    localStorage.setItem("usuario_id",data.usuario.usu_id);
 //                }else{
 //                    $alert();
 //                }
                
                
 //            }else{
 //                $scope.alert();
 //            }
            
 //        })
 //        .error(function(){
            
 //        });
 //    };



	// $scope.logout = function(){
 //        page.popPage();   
 //        localStorage.clear();
 //    }
    
            
            
 //    $scope.alert = function() {
 //        ons.notification.alert({message: 'Correo o Contraseña incorrecta'});
 //    }
});