/* Estadisticas mensuales */
select month(ped_fecha_creacion) Mes, sum(pro_precio) from pedido_producto where  month(ped_fecha_creacion) = "02";

/* Estadistica dia*/
select day(ped_fecha_creacion) Dia, sum(pro_precio) total from pedido_producto where day(ped_fecha_creacion) = "09";

/* Estadistica anual */
select year(ped_fecha_creacion) Anio, sum(pro_precio) total from pedido_producto where year(ped_fecha_creacion) = "2015";

Select * from pedido_producto;

/* Estadisticas mensuales totales*/
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
from pedido_producto where year(ped_fecha_creacion) = "2014"  group by month(ped_fecha_creacion);

/* Estadisticas mensuales totales IVA*/
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
from pedido_producto where year(ped_fecha_creacion) = "2015" and pro_genera_iva = "1"  group by month(ped_fecha_creacion);

/* Estadisticas mensuales totales sin IVA*/
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
from pedido_producto where year(ped_fecha_creacion) = "2015" and pro_genera_iva = "0"  group by month(ped_fecha_creacion);


/*Estadisticas anuales*/

select  year(ped_fecha_creacion) anio,
ifnull(sum(pro_precio),0) Total
from pedido_producto group by year(ped_fecha_creacion) order by anio desc;

/*Estadisticas anuales con iva*/

select  year(ped_fecha_creacion) anio,
ifnull(sum(pro_precio),0) Total
from pedido_producto  where pro_genera_iva = "1"  group by year(ped_fecha_creacion) order by anio desc;


/*Estadisticas anuales sin iva*/

select  year(ped_fecha_creacion) anio,
ifnull(sum(pro_precio),0) Total
from pedido_producto  where pro_genera_iva = "0"  group by year(ped_fecha_creacion) order by anio desc;


/* Estadisticas por semana */
select week(ped_fecha_creacion)Semana, sum(pro_precio) Total from pedido_producto where month(ped_fecha_creacion) = "02" 
and year(ped_fecha_creacion) = "2014" group  by Semana; 

/* Estadisticas por semana con iva*/
select week(ped_fecha_creacion)Semana, sum(pro_precio) Total from pedido_producto where month(ped_fecha_creacion) = "02" 
and year(ped_fecha_creacion) = "2014" and pro_genera_iva = "1" group  by Semana; 

/* Estadisticas por semana */
select week(ped_fecha_creacion)Semana, sum(pro_precio) Total from pedido_producto where month(ped_fecha_creacion) = "02" 
and year(ped_fecha_creacion) = "2014" and pro_genera_iva = "0" group  by Semana; 


/* Estadisticas productos vendidos mensuales*/
select pro_nombre, count(*) Total from pedido_producto where month(ped_fecha_creacion) = "02" 
and year(ped_fecha_creacion) = "2014" group by pro_id order by Total desc;

/* Estadisticas productos vendidos mensuales con iva*/
select pro_nombre, count(*) Total from pedido_producto where month(ped_fecha_creacion) = "02" 
and year(ped_fecha_creacion) = "2015" and pro_genera_iva = "1" group by pro_id order by Total desc;

/* Estadisticas productos vendidos mensuales sin iva*/
select pro_nombre, count(*) Total from pedido_producto where month(ped_fecha_creacion) = "02" 
and year(ped_fecha_creacion) = "2015" and pro_genera_iva = "0" group by pro_id order by Total desc;
