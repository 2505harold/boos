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


/*  pruebas para sevone - eliminar   */
drop table device_sevone;
create table device_sevone(
    id int not null,
    isDeletec boolean,
    isNew boolean,
    name varchar(100),
    alternateName varchar(50),
    descripcion varchar(255),
    ipAddress varchar(50),
    peerId int,
    pollFrequency int,
    dateAdded nvarchar(100),
    lastDiscovery nvarchar(100),
    allowDelete boolean,
    disablePolling boolean,
    disableConcurrentPolling boolean,
    disableThresholding boolean,
    timezone nvarchar(50),
    workhoursGroupId int,
    numElements int,
    pluginInfo nvarchar(50),
    objects nvarchar(50),
    pluginManagerId int

);

delete from device_name

insert into device_sevone
(id,isDeletec,isNew,name,alternateName,descripcion,ipAddress,peerId,pollFrequency,dateAdded,lastDiscovery,allowDelete,disablePolling,disableConcurrentPolling,disableThresholding,timezone,workhoursGroupId,numElements,pluginInfo,objects,pluginManagerId)
values
(13,false,false,"VCX_AEROPUERTO_P1","","Device Inserted For Bulk Data", null,1,300,'1575986133000', '1578632431000',true,false,false,false,"UTC",1,0,null,null,null),
(14,false,false,"VCX_CHICLAYO_P1","","Device Inserted For Bulk Data", null,1,300,'1575988547000', '1578632416000',true,false,false,false,"UTC",1,372,null,null,null),
(15,false,false,"VCX_AREQUIPA_P1","","Device Inserted For Bulk Data", null,1,300,'1576096849000', '1578632437000',true,false,false,false,"UTC",1,555,null,null,null),
(15,false,false,"VCX_CUSCO_P1","","Device Inserted For Bulk Data", null,1,300,'1576097753000', '1578632431000',true,false,false,false,"UTC",1,0,null,null,null);

drop table object_device_sevone

create table object_device_sevone(
    id int not null,
    deviceId int,
    pluginId int,
    pluginObjectTypeId int,
    subtypeId int,
    name nvarchar(255),
    descripcion nvarchar(100),
    isEnabled boolean,
    isDeleted boolean,
    isVisible boolean,
    dateAdded nvarchar(50),
    indicators nvarchar(50),
    extendedInfo nvarchar(50)

);

insert into object_device_sevone
(id,deviceId,pluginId,pluginObjectTypeId,subtypeId,name,descripcion,isEnabled,isVisible,isDeleted,dateAdded,indicators,extendedInfo)
values
(781,13,17,1587,0,"TWAMP-4G_LH2951_SAN_MIGUEL_DE_CAURI (Aeropuerto_4G_LH2951_rCSRSanMiguelDeCauri_EF)","",false,false,false,"1576040421000",null,null),
(274,13,17,1587,0,"TWAMP-4G_LI0002_SAENZ_PENA (Aeropuerto_4G_LI0002_rCSRSaenzPena_AF12)","",false,false,false,"1575986172000",null,null),
(1279,13,17,1587,0,"TWAMP-4G_LI0002_SAENZ_PENA (Aeropuerto_4G_LI0002_rCSRSaenzPena_EF)","",false,false,false,"1576040421000",null,null),
(1781,13,17,1587,0,"TWAMP-4G_LH2951_SAN_MIGUEL_DE_CAURI (Aeropuerto_4G_LH2951_rCSRSanMiguelDeCauri_EF)","",false,false,false,"1576040446000",null,null),
(301,13,17,1587,0,"TWAMP-4G_LI0028_EUCALIPTOS (Aeropuerto_4G_LI0028_rCSREucaliptos_AF12)","",false,false,false,"1575986174000",null,null),
(11123,13,17,1587,0,"TWAMP-rCSR03DeOctubre (Aeropuerto_rCSR03DeOctubre_AF12)","",false,false,false,"1576178943000",null,null),
(3325,13,17,1587,0,"TWAMP-rCSR03DeOctubre (Aeropuerto_rCSR03DeOctubre_EF)","",false,false,false,"1576178943000",null,null),
(11013,13,17,1587,0,"TWAMP-rCSR28DeJulio (Aeropuerto_rCSR28DeJulio_AF12)","",false,false,false,"1576178943000",null,null),
(3290,13,17,1587,0,"TWAMP-rCSR28DeJulio (Aeropuerto_rCSR28DeJulio_EF)","",false,false,false,"1576178943000",null,null),
(10961,13,17,1587,0,"TWAMP-rCSR29deAgosto (Aeropuerto_rCSR29deAgosto_AF12)","",false,false,false,"1576178943000",null,null),
(3571,13,17,1587,0,"TWAMP-rCSR29deAgosto (Aeropuerto_rCSR29deAgosto_EF)","",false,false,false,"1576178943000",null,null);

drop table indicators_object_device_sevone

create table indicators_object_device_sevone(
    id int not null,
    deviceId int,
    objectId int,
    pluginId int,
    pluginIndicatorTypeId int,
    name nvarchar(255),
    description nvarchar(255),
    dataUnits nvarchar(20),
    displayUnits nvarchar(20),
    isEnabled boolean,
    isBaselining boolean,
    isDeleted boolean,
    maxValor int,
    format nvarchar(20),
    lastInvalidationTime nvarchar(20),
    syntheticExpression nvarchar(20),
    evaluationOrder int,
    extendedInfo nvarchar(20)
);


insert into indicators_object_device_sevone
(id,deviceId,objectId,pluginId,pluginIndicatorTypeId,name,description,dataUnits,displayUnits,isEnabled,isBaselining,isDeleted,maxValor,format,lastInvalidationTime,syntheticExpression,evaluationOrder,extendedInfo)
values
(129129,13,11013,17,13260,"P2R Burst Len Loss Max","P2R Burst Len Loss Max","Number","Number",true,true,false,0,"GAUGE",0,null,1,null),
(129130,13,11013,17,13261,"P2R Burst Len Loss Min","P2R Burst Len Loss Min","Number","Number",true,true,false,0,"GAUGE",0,null,1,null),
(129131,13,11013,17,13262,"P2R Bytes Received","P2R Bytes Received","Bytes","Bytes",true,true,false,0,"GAUGE",0,null,1,null),
(129132,13,11013,17,13263,"P2R Delay Max","P2R Delay Max","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129176,13,11013,17,13306,"R2P Delay Max","R2P Delay Max","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129133,13,11013,17,13264,"P2R Delay Mean","P2R Delay Mean","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129134,13,11013,17,13265,"P2R Delay Min","P2R Delay Min","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129135,13,11013,17,13266,"P2R Delay P95","P2R Delay P95","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129136,13,11013,17,13267,"P2R Delay P96","P2R Delay P96","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129137,13,11013,17,13268,"P2R Delay P98","P2R Delay P98","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129138,13,11013,17,13269,"P2R Delay P99","P2R Delay P99","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129139,13,11013,17,13270,"P2R Delay StdDev","P2R Delay StdDev","Microseconds","Microseconds",true,true,false,0,"GAUGE",0,null,1,null),
(129151,13,11013,17,13282,"P2R Packets Lost","P2R Packets Lost","Number","Number",true,true,false,0,"GAUGE",0,null,1,null),
(129195,13,11013,17,13325,"R2P Packets Lost","R2P Packets Lost","Number","Number",true,true,false,0,"GAUGE",0,null,1,null);