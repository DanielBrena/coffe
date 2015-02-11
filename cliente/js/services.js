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
			//return $http.get(ServiceURL.pedido_has_producto() + "/pedido/" + id);
			return ServicioPedidoProducto.loadProductosId(id)
		},
		total: function(id){
			return ServicioPedidoProducto.total(id);
			//return $http.get(ServiceURL.pedido_has_producto() + "/total/" + id);
		},
		findLike: function(q){
			return $http.get(ServiceURL.pedido() + "/like/" + q);
		},
		pagar: function(pedido){
			return $http.put(ServiceURL.pedido() + "/update", pedido)
		}

	}
});

app.service("ServicioPedidoProducto",function($http,ServiceURL){
	this.loadProductosId = function(id){
		return $http.get(ServiceURL.pedido_has_producto() + "/pedido/" + id);
	},
	this.total = function(id){
		return $http.get(ServiceURL.pedido_has_producto() + "/total/" + id);
	}
});

