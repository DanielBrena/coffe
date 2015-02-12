select * from pedido;

select * from producto;


/* Crear vista */
select * from pedido_has_producto  join  pedido on pedido_has_producto.pedido_ped_id = pedido.ped_id
 join producto on pedido_has_producto.producto_pro_id = producto.pro_id;
 
create view pedido_producto as (
	select * from pedido_has_producto  join  pedido on pedido_has_producto.pedido_ped_id = pedido.ped_id
 join producto on pedido_has_producto.producto_pro_id = producto.pro_id
);

select * from pedido_producto;
drop view pedido_producto;
/* Total cuenta */

select sum(pro_precio) from pedido_producto where pedido_ped_id = "ped1";

select * from pedido_has_producto;


select * from pedido;

select * from pedido_has_producto;

create trigger pedido_has_producto_id_delete after delete on pedido
for each row
	BEGIN 
    delete from pedido_has_producto where pedido_has_producto.pedido_ped_id = old.ped_id
    END
$$
