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

/* Estadisticas mensuales */
select month(ped_fecha_creacion) Mes, sum(pro_precio) from pedido_producto where  month(ped_fecha_creacion) = "01";

/* Estadistica dia*/
select day(ped_fecha_creacion) Dia, sum(pro_precio) total from pedido_producto where day(ped_fecha_creacion) = "09";

/* Estadistica anual */
select year(ped_fecha_creacion) Anio, sum(pro_precio) total from pedido_producto where year(ped_fecha_creacion) = "2015";

Select * from pedido_producto;

/* Estadisticas mensuales*/
select case month(ped_fecha_creacion) 
	when '01' then 'Enero'
	when '02' then 'Febrero'
	when '03' then 'Marzo'
	when '04' then 'Abril'
	when '05' then 'Mayo'
	when '06' then 'Junio'
	when '07' then 'Julio'
	when '08' then 'Agosto'
	when '09' then 'Septiembre'
	when '10' then 'Octubre'
	when '11' then 'Noviembre'
	when '12' then 'Diciembre'
end mes,
ifnull(sum(pro_precio),0) Total
from pedido_producto where year(ped_fecha_creacion) = "2015" group by month(ped_fecha_creacion);

/*Estadisticas anuales*/

select  year(ped_fecha_creacion) Anio,
ifnull(sum(pro_precio),0) Total
from pedido_producto group by year(ped_fecha_creacion) order by Anio DESC;

/* Estadisticas productos vendidos mensuales*/
select pro_nombre, count(*) Total from pedido_producto where month(ped_fecha_creacion) = "02"
 and year(ped_fecha_creacion) = "2014" group by pro_id order by total desc;

/* Estadisticas por semana */
select week(ped_fecha_creacion)Semana, sum(pro_precio) Total from pedido_producto
where month(ped_fecha_creacion) = "02"
 and year(ped_fecha_creacion) = "2014"
 group by Semana; 
