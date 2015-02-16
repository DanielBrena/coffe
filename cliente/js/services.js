/******
	Pedido

******/

app.service("ServicePedido", function($http,ServiceURL,ServicePedidoProducto,$window){
	user = JSON.parse($window.localStorage.getItem("sesion"));
	return {
		all: function(){
			return $http.get(ServiceURL.pedido() + "/all",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		add: function(pedido){
			return $http.post(ServiceURL.pedido() + "/add", pedido,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		delete: function(id){
			return $http.delete(ServiceURL.pedido() + "/delete/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		loadId: function(id){

		},
		loadProductosId: function(id){
			return ServicePedidoProducto.loadProductosId(id)
		},
		total: function(id){
			return ServicePedidoProducto.total(id);
		},
		findLike: function(q){
			return $http.get(ServiceURL.pedido() + "/like/" + q,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		pagar: function(pedido){
			return $http.put(ServiceURL.pedido() + "/update", pedido,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}})
		}

	}
});

/******
	Pedido Producto

******/
app.service("ServicePedidoProducto",function($http,ServiceURL,$window){
	user = JSON.parse($window.localStorage.getItem("sesion"));
	this.loadProductosId = function(id){
		return $http.get(ServiceURL.pedido_has_producto() + "/pedido/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
	},
	this.total = function(id){
		return $http.get(ServiceURL.pedido_has_producto() + "/total/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
	},
	this.add = function(pedido_producto){
		return $http.post(ServiceURL.pedido_has_producto() + "/add", pedido_producto,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
	},
	this.delete = function(id){
		return $http.delete(ServiceURL.pedido_has_producto() + "/delete/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
	},
	this.update = function(producto){
		return $http.put(ServiceURL.pedido_has_producto() + "/update",producto ,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
	}
});

/******
	Producto

******/
app.service("ServiceProducto",function($http,ServiceURL,ServicePedidoProducto,$window){
	user = JSON.parse($window.localStorage.getItem("sesion"));
	return {

		all: function(){
			return $http.get(ServiceURL.producto() + "/all",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		add: function(pedido_producto){
			return ServicePedidoProducto.add(pedido_producto);
		},
		add_producto: function(producto){
			return $http.post(ServiceURL.producto() + "/add",producto,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		delete_producto: function(id){
			return $http.delete(ServiceURL.producto() + "/delete/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		delete: function(id){
			return ServicePedidoProducto.delete(id);
		},
		entregar: function(producto){
			return ServicePedidoProducto.update(producto);
		},
		findLike: function(q){
			return $http.get(ServiceURL.producto() + "/like/" + q,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		loadId: function(id){
			return $http.get(ServiceURL.producto() + "/id/" +id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		update: function(producto){
			return $http.put(ServiceURL.producto() + "/update",producto,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}} );
		}
	}
});

/******
	Entrada

******/
app.service("ServiceEntrada",function($http,ServiceURL,ServiceCategoriaEntrada,$window){
	user = JSON.parse($window.localStorage.getItem("sesion"));
	return {
		all: function(){
			return $http.get(ServiceURL.entrada() + "/all",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		add: function(entrada){
			return $http.post(ServiceURL.entrada() + "/add",entrada,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		delete: function(id){
			return $http.delete(ServiceURL.entrada() + "/delete/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		findLike: function(q){
			return $http.get(ServiceURL.entrada() + "/like/" + q,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		loadId: function(id){
			return $http.get(ServiceURL.entrada() + "/id/" +id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		update: function(entrada){
			return $http.put(ServiceURL.entrada() + "/update",entrada ,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		}
	}
});


/********
	
	Ingrediente

********/



app.service("ServiceIngrediente",function($http,ServiceURL,$window){
	user = JSON.parse($window.localStorage.getItem("sesion"));
	return{
		all: function(){
			return $http.get(ServiceURL.ingrediente() + "/all",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		add: function(ingrediente){
			return $http.post(ServiceURL.ingrediente() + "/add", ingrediente,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		delete: function(id){
			return $http.delete(ServiceURL.ingrediente() + "/delete/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		update: function(ingrediente){
			return $http.put(ServiceURL.ingrediente() + "/update", ingrediente,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}})
		},
		like: function(q){
			return $http.get(ServiceURL.ingrediente() + "/like/" +q,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		loadId: function(id){
			return $http.get(ServiceURL.ingrediente() + "/id/" +id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		}
	}
});

app.service("ServiceCategoriaProducto",function($http,ServiceURL,$window){
	user = JSON.parse($window.localStorage.getItem("sesion"));
	return{
		all: function(){
			return $http.get(ServiceURL.categoria_producto() + "/all",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		add: function(categoria_producto){
			return $http.post(ServiceURL.categoria_producto() + "/add", categoria_producto,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		delete: function(id){
			return $http.delete(ServiceURL.categoria_producto() + "/delete/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		update: function(categoria_producto){
			return $http.put(ServiceURL.categoria_producto() + "/update", categoria_producto,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}})
		},
		like: function(q){
			return $http.get(ServiceURL.categoria_producto() + "/like/" +q,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		loadId: function(id){
			return $http.get(ServiceURL.categoria_producto() + "/id/" +id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		}
	}
});


app.service("ServiceCategoriaEntrada",function($http,ServiceURL,$window){
	user = JSON.parse($window.localStorage.getItem("sesion"));
	return{
		all: function(){
			return $http.get(ServiceURL.categoria_entrada() + "/all",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		add: function(categoria_entrada){
			return $http.post(ServiceURL.categoria_entrada() + "/add", categoria_entrada,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		delete: function(id){
			return $http.delete(ServiceURL.categoria_entrada() + "/delete/" + id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		update: function(categoria_entrada){
			return $http.put(ServiceURL.categoria_entrada() + "/update", categoria_entrada,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}})
		},
		like: function(q){
			return $http.get(ServiceURL.categoria_entrada() + "/like/" +q,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		loadId: function(id){
			return $http.get(ServiceURL.categoria_entrada() + "/id/" +id,{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		}
	}
});


app.service("ServiceEstadistica",function($http,ServiceURL,$window){
	user = JSON.parse($window.localStorage.getItem("sesion"));
	return {
		month: function(){
			return $http.get(ServiceURL.estadistica() + "/month",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		month_con_iva: function(){
			return $http.get(ServiceURL.estadistica() + "/month/iva",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		month_sin_iva: function(){
			return $http.get(ServiceURL.estadistica() + "/month/siniva",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		year: function(){
			return $http.get(ServiceURL.estadistica() + "/year",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		week: function(){
			return $http.get(ServiceURL.estadistica() + "/week",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		producto_month: function(){
			return $http.get(ServiceURL.estadistica() + "/producto/month",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		entrada_month: function(){
			return $http.get(ServiceURL.estadistica() + "/entrada/month",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		},
		entrada_year: function(){
			return $http.get(ServiceURL.estadistica() + "/entrada/year",{headers:{"user":user.usu_usuario,"pass":user.usu_contrasena}});
		}
	}
});





