var url = "http://localhost:8888/coffe/api/api/";
var objCategoria;
$(document).ready(function(){

	inicio();


});

function inicio(){

	$("#btn_eliminar").hide();

	$("#crear").click(function(){
		newCategoria();
		return false;
	});

	$("#btn_eliminar").click(function(){
		deleteCategoria();
	});


	$("#btn_guardar").click(function(){

		if( $("#id").val() == ''){
			addCategoria();
		}else{
			updateCategoria();
		}

		return false;

	});

	findAll();


}


function newCategoria(){

	$("#btn_eliminar").hide();
	$("#id").removeAttr("disabled");
	objCategoria = {};
	renderDetails(objCategoria);

}

function findAll(){
	

	$.ajax({
        type: 'GET',
        url: url + "categoria_producto/all",
        dataType: "json", // data type of response
        success: renderList
    });
}

function renderDetails(objCategoria){
	$("#id").val(objCategoria.cp_id);
	$("#nombre").val(objCategoria.cp_nombre);
	$("#fecha").val(objCategoria.cp_fecha_creacion);
	$("#descripcion").val(objCategoria.cp_descripcion);
}

function renderList(data){
	$("#lista_categoria").html("");
	var list = data == null ? [] : (data.categoria_producto instanceof Array ? data.categoria_producto : [data.categoria_producto]);

	$.each(list, function(index, cp) {
		$("#lista_categoria").append('<a href="#" data-id="'+cp.cp_id+'" class="list-group-item">'+cp.cp_nombre+'</a>');
	});


	$("#lista_categoria a").on('click',function(){
		$("#id").attr("disabled","disabled");
		findById( $(this).data("id") );
	})

}

function addCategoria(){
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: url + "categoria_producto/add",
        dataType: "json",
        data: convertJSON(),
        success: function(data, textStatus, jqXHR){

            $.growl(" ¡ Categoria creada !", {
				type: "success",
				animate: {
					enter: 'animated bounceIn',
					exit: 'animated bounceOut'
				}
			});
            console.log(data);
            $('#btn_eliminar').show();
            $('#id').val(data.cp_id);
            $("#id").attr("disabled","disabled");
            findAll();
        },
        error: function(jqXHR, textStatus, errorThrown){
           
            $.growl(" ¡ Error ! " +  textStatus, {
				type: "danger",
				animate: {
					enter: 'animated bounceIn',
					exit: 'animated bounceOut'
				}
			});
        }
    });
}

function findById(id){

	$.ajax({
		type: 'GET',
		url: url + 'categoria_producto/id/' + id,
		dataType: "json",
		success: function(data){
			$('#btn_eliminar').show();
			objCategoria = data;
			renderDetails(objCategoria);
		}
	});
}

function updateCategoria(){

	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: url + 'categoria_producto/update/' + $('#id').val(),
		dataType: "json",
		data: convertJSON(),
		success: function(data, textStatus, jqXHR){

			$.growl(" ¡ Categoria actualizada !", {
				type: "success",
				animate: {
					enter: 'animated bounceIn',
					exit: 'animated bounceOut'
				}
			});

			findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){

			$.growl(" ¡ Error ! " +  textStatus, {
				type: "danger",
				animate: {
					enter: 'animated bounceIn',
					exit: 'animated bounceOut'
				}
			});
		}
	});
}

function deleteCategoria(){

	$.ajax({
		type: 'DELETE',
		contentType: 'application/json',
		url: url + 'categoria_producto/delete/' + $('#id').val(),
		success: function(data, textStatus, jqXHR){
			$.growl(" ¡ Categoria eliminada !", {
				type: "success",
				animate: {
					enter: 'animated bounceIn',
					exit: 'animated bounceOut'
				}
			});

			findAll();
			objCategoria = {};
			renderDetails(objCategoria);

			$("#id").removeAttr("disabled");
			$("#btn_eliminar").hide();

		},
		error: function(jqXHR, textStatus, errorThrown){

			$.growl(" ¡ Error ! " +  textStatus, {
				type: "danger",
				animate: {
					enter: 'animated bounceIn',
					exit: 'animated bounceOut'
				}
			});
		}
	});
}

function convertJSON(){

	return JSON.stringify(
		{
			"cp_id": $("#id").val(),
			"cp_nombre": $("#nombre").val(),
			"cp_descripcion": $("#descripcion").val(),
			"cp_fecha_creacion": $("#fecha").val()
		}
	);
}