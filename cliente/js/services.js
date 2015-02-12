/******
	Pedido

******/

app.service("ServicePedido", function($http,ServiceURL,ServicioPedidoProducto){
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
			return ServicioPedidoProducto.loadProductosId(id)
		},
		total: function(id){
			return ServicioPedidoProducto.total(id);
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
app.service("ServicioPedidoProducto",function($http,ServiceURL){
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
app.service("ServiceProducto",function($http,ServiceURL,ServicioPedidoProducto){
	return {
		all: function(){
			return $http.get(ServiceURL.producto() + "/all");
		},
		add: function(pedido_producto){
			return ServicioPedidoProducto.add(pedido_producto);
		},
		delete: function(id){
			return ServicioPedidoProducto.delete(id);
		},
		entregar: function(producto){
			return ServicioPedidoProducto.update(producto);
		},
		findLike: function(q){
			return $http.get(ServiceURL.producto() + "/like/" + q);
		}
	}
})