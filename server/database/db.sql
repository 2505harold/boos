create database db_boos;

use db_boos;


create table detalle_verificacion_medidores(
    id int not null,
    item int,
    nro_banco int,
    codigo_medidor varchar(50),
    codigo_prescinto varchar(50),
    q3 float,
    error_q3 float,
    q2 float,
    error_q2 float,
    q1 float,
    error_q1 float,
    ensayo_presion varchar(50),
    fecha_ejecucion date,
    certificado varchar(100),
    estado varchar(20),
    nombre_file varchar(30)

);


alter table detalle_verificacion_medidores
add primary key (id);

alter table detalle_verificacion_medidores
modify id int not null auto_increment, auto_increment = 1;



create table detalle_registro_prescintos(
    id int not null,
    codigo_apertura varchar(10),
    responsable varchar(50),
    fecha_apertura datetime,
    fecha_cierre datetime    
);

alter table detalle_registro_prescintos
add primary key (id);

alter table detalle_registro_prescintos
modify id int not null auto_increment, auto_increment = 1;

create table detalle_archivos_importados (
    id int not null,
    nombre varchar(30),
    fecha_subida datetime,
    responsable varchar(50),
    estado_prescintos varchar(10)
);

alter table detalle_archivos_importados
add primary key (id);

alter table detalle_archivos_importados
modify id int not null auto_increment, auto_increment = 1;


create table formato_verificacion_medidores(
    id int not null,
    codigo varchar(50) not null,
    responsable varchar(100) not null,
    fecha_creacion datetime,
    fecha_actualizacion datetime,
    fecha_vigencia datetime
);

alter table formato_verificacion_medidores
add primary key (id);

alter table formato_verificacion_medidores
modify id int not null auto_increment, auto_increment = 1;

