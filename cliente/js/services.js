/******
	Pedido

******/

app.service("ServicePedido", function($http,ServiceURL,ServicePedidoProducto){
	return {
		all: function(){
			return $http.get(ServiceURL.pedido() + "/all");
		},
		add: function(pedido){
			return $http.post(ServiceURL.pedido() + "/add", pedido);
		},
		delete: function(id){
			return $http.delete(ServiceURL.pedido() + "/delete/" + id);
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
			return $http.get(ServiceURL.pedido() + "/like/" + q);
		},
		pagar: function(pedido){
			return $http.put(ServiceURL.pedido() + "/update", pedido)
		}

	}
});

/******
	Pedido Producto

******/
app.service("ServicePedidoProducto",function($http,ServiceURL){
	this.loadProductosId = function(id){
		return $http.get(ServiceURL.pedido_has_producto() + "/pedido/" + id);
	},
	this.total = function(id){
		return $http.get(ServiceURL.pedido_has_producto() + "/total/" + id);
	},
	this.add = function(pedido_producto){
		return $http.post(ServiceURL.pedido_has_producto() + "/add", pedido_producto);
	},
	this.delete = function(id){
		return $http.delete(ServiceURL.pedido_has_producto() + "/delete/" + id);
	},
	this.update = function(producto){
		return $http.put(ServiceURL.pedido_has_producto() + "/update",producto );
	}
});

/******
	Producto

******/
app.service("ServiceProducto",function($http,ServiceURL,ServicePedidoProducto){
	return {
		all: function(){
			return $http.get(ServiceURL.producto() + "/all");
		},
		add: function(pedido_producto){
			return ServicePedidoProducto.add(pedido_producto);
		},
		add_producto: function(producto){
			return $http.post(ServiceURL.producto() + "/add",producto);
		},
		delete_producto: function(id){
			return $http.delete(ServiceURL.producto() + "/delete/" + id);
		},
		delete: function(id){
			return ServicePedidoProducto.delete(id);
		},
		entregar: function(producto){
			return ServicePedidoProducto.update(producto);
		},
		findLike: function(q){
			return $http.get(ServiceURL.producto() + "/like/" + q);
		},
		loadId: function(id){
			return $http.get(ServiceURL.producto() + "/id/" +id);
		},
		update: function(producto){
			return $http.put(ServiceURL.producto() + "/update",producto );
		}
	}
});

/******
	Entrada

******/
app.service("ServiceEntrada",function($http,ServiceURL,ServiceCategoriaEntrada){
	return {
		all: function(){
			return $http.get(ServiceURL.entrada() + "/all");
		},
		add: function(entrada){
			return $http.post(ServiceURL.entrada() + "/add",entrada);
		},
		delete: function(id){
			return $http.delete(ServiceURL.entrada() + "/delete/" + id);
		},
		findLike: function(q){
			return $http.get(ServiceURL.entrada() + "/like/" + q);
		},
		loadId: function(id){
			return $http.get(ServiceURL.entrada() + "/id/" +id);
		},
		update: function(entrada){
			return $http.put(ServiceURL.entrada() + "/update",entrada );
		}
	}
});


/********
	
	Ingrediente

********/



app.service("ServiceIngrediente",function($http,ServiceURL){
	return{
		all: function(){
			return $http.get(ServiceURL.ingrediente() + "/all");
		},
		add: function(ingrediente){
			return $http.post(ServiceURL.ingrediente() + "/add", ingrediente);
		},
		delete: function(id){
			return $http.delete(ServiceURL.ingrediente() + "/delete/" + id);
		},
		update: function(ingrediente){
			return $http.put(ServiceURL.ingrediente() + "/update", ingrediente)
		},
		like: function(q){
			return $http.get(ServiceURL.ingrediente() + "/like/" +q);
		},
		loadId: function(id){
			return $http.get(ServiceURL.ingrediente() + "/id/" +id);
		}
	}
});

app.service("ServiceCategoriaProducto",function($http,ServiceURL){
	return{
		all: function(){
			return $http.get(ServiceURL.categoria_producto() + "/all");
		},
		add: function(categoria_producto){
			return $http.post(ServiceURL.categoria_producto() + "/add", categoria_producto);
		},
		delete: function(id){
			return $http.delete(ServiceURL.categoria_producto() + "/delete/" + id);
		},
		update: function(categoria_producto){
			return $http.put(ServiceURL.categoria_producto() + "/update", categoria_producto)
		},
		like: function(q){
			return $http.get(ServiceURL.categoria_producto() + "/like/" +q);
		},
		loadId: function(id){
			return $http.get(ServiceURL.categoria_producto() + "/id/" +id);
		}
	}
});


app.service("ServiceCategoriaEntrada",function($http,ServiceURL){
	return{
		all: function(){
			return $http.get(ServiceURL.categoria_entrada() + "/all");
		},
		add: function(categoria_entrada){
			return $http.post(ServiceURL.categoria_entrada() + "/add", categoria_entrada);
		},
		delete: function(id){
			return $http.delete(ServiceURL.categoria_entrada() + "/delete/" + id);
		},
		update: function(categoria_entrada){
			return $http.put(ServiceURL.categoria_entrada() + "/update", categoria_entrada)
		},
		like: function(q){
			return $http.get(ServiceURL.categoria_entrada() + "/like/" +q);
		},
		loadId: function(id){
			return $http.get(ServiceURL.categoria_entrada() + "/id/" +id);
		}
	}
});


app.service("ServiceEstadistica",function($http,ServiceURL){
	return {
		month: function(){
			return $http.get(ServiceURL.estadistica() + "/month");
		},
		month_con_iva: function(){
			return $http.get(ServiceURL.estadistica() + "/month/iva");
		},
		month_sin_iva: function(){
			return $http.get(ServiceURL.estadistica() + "/month/siniva");
		},
		year: function(){
			return $http.get(ServiceURL.estadistica() + "/year");
		},
		week: function(){
			return $http.get(ServiceURL.estadistica() + "/week");
		},
		producto_month: function(){
			return $http.get(ServiceURL.estadistica() + "/producto/month");
		}
	}
});





