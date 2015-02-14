var module = ons.bootstrap();

/**

	Configuracion de la URL de la API

*/
app.service("ServiceURL",function(){
	var url = "http://localhost:8888/coffe/api/api/";

    this.pedido = function(){
        return url + "pedido";
    };

    this.ingrediente = function(){
    	return url + "ingrediente";
    };

    this.categoria_producto = function(){
    	return url + "categoria_producto";
    };
    
    this.categoria_entrada = function(){
        return url + "categoria_entrada";
    };

    this.producto = function(){
    	return url + "producto";
    };

    this.entrada = function(){
        return url + "entrada";
    };

    this.pedido_has_producto = function(){
    	return url + "pedido_has_producto";
    };

    this.usuario = function(){
    	return url + "usuario";
    },
    this.estadistica = function(){
        return url + "estadistica";
    }


});