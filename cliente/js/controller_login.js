
app.service("ServiceLogin",function(ServiceURL,$http){
    return {


        login : function(usuario){
            return $http.post(ServiceURL.usuario() + "/login",usuario);
        }
        
    }

});



module.controller('Login',function($scope,ServiceLogin,$window){
    $scope.usuario = {};
    $scope.login = function(usuario){
        ServiceLogin.login(usuario).success(function(data){
            
            if( data.login ){
                if( data.usuario.usu_rol == 1 ){
                    page.pushPage("admin.html",{animation:"slide"});
                    $window.localStorage.setItem("usuario",data.usuario.usu_id);
                }else{
                    alert();
                }
            }else{
                alert();
            }   
            
        });  
    }

   

    function alert() {
        ons.notification.alert({message: 'Correo o Contraseña incorrecta'});
    }

});