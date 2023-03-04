CREATE DATABASE medical_record;

\c medical_record

CREATE TABLE tipo_usuario (
  id SERIAL NOT NULL,
  rol VARCHAR(50) PRIMARY KEY NOT NULL
);

CREATE TABLE paciente (
  identificacion VARCHAR(40) PRIMARY KEY NOT NULL,
  nombre VARCHAR(250),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  direccion VARCHAR(100),
  fecha_nacimiento DATE,
  rol VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (rol) REFERENCES tipo_usuario(rol)
);

CREATE TABLE hospital (
  identificacion VARCHAR(40) PRIMARY KEY NOT NULL,
  nombre VARCHAR(250),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  direccion VARCHAR(100),
  servicio_medico VARCHAR(100),
  rol VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (rol) REFERENCES tipo_usuario(rol)
);

CREATE TABLE medico (
  identificacion VARCHAR(40) PRIMARY KEY NOT NULL,
  nombre VARCHAR(250) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  telefono VARCHAR(15) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (rol) REFERENCES tipo_usuario(rol)
);

CREATE TABLE observacion (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  especialidad_medica VARCHAR(100) NOT NULL,
  estado_salud VARCHAR(100) NOT NULL,
  detalle VARCHAR(250) NOT NULL,
  id_hospital VARCHAR(40) NOT NULL,
  id_medico VARCHAR(40) NOT NULL,
  id_paciente VARCHAR(40) NOT NULL,
  FOREIGN KEY (id_hospital) REFERENCES hospital(identificacion),
  FOREIGN KEY (id_medico) REFERENCES medico(identificacion),
  FOREIGN KEY (id_paciente) REFERENCES paciente(identificacion)
);


insert into tipo_usuario (rol) values ('hospital');
insert into tipo_usuario (rol) values ('medico');
insert into tipo_usuario (rol) values ('paciente');

insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('108db892-0a9a-47da-a2ed-40f3ea03e28e', 'Kylen Houchen', 'khouchen0@mashable.com', '07feb5104eaf41d37a7ac829a988a162f17224c9e9d6cbcae5b40b8c3026a0bb', '724-597-9670', '219 Nova Avenue', '1974-04-16', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('5ac91987-78ad-4a30-a651-5efff726b4ea', 'Gabriell Sahnow', 'gsahnow1@yellowpages.com', 'cc751db9d3b46aa988b373f680c9fb3879f9f430e355979459f8d52886d9d5bb', '914-528-2214', '930 Mayer Parkway', '1961-06-24', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('16749632-b875-4c1b-96d8-2c8e5cfd8614', 'Yankee Duesbury', 'yduesbury2@cargocollective.com', '46184f5a18a60fbfb24f4f1a4934bef003f3da267953d926b211d45f8d255cc4', '362-231-3819', '175 Oak Park', '1964-03-07', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('46e621d4-e59e-46a9-b6d5-6af0f3dac48d', 'Sallyanne Bermingham', 'sbermingham3@jimdo.com', '13fff996ee0e028c79e3c09b33ac46696bc66a8ff120070ca89f49c8177ab698', '461-826-8046', '815 Westend Place', '1991-01-30', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('1c769c2c-5a24-4104-8519-04b0a8214008', 'Bink Chaundy', 'bchaundy4@flavors.me', 'cc2043cd25035d293241a795ea6d722948d1aaf5aa0a215d374c431c6433c97f', '248-619-4076', '421 Forest Dale Terrace', '1972-02-10', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('9430a13c-706a-4c92-a794-e1da81c0b683', 'Emmie Maskrey', 'emaskrey5@sbwire.com', 'd9e991a0e2b5c5c5fee10778495daf2faae0048e6794709049165307cde51f03', '551-528-8907', '086 Delaware Circle', '1963-08-28', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('0d054dff-440c-4114-b80f-669141c16231', 'Juditha Tovey', 'jtovey6@fc2.com', 'fd276e1d92f4dc024ffc6a3238ce63263fd12e005b7d8c9ff9e95dcf50eb17bb', '669-390-3406', '2430 Donald Court', '1986-01-13', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('1275fa4e-0e4e-4781-82a6-1163051c38bf', 'Janaya Oxborough', 'joxborough7@hostgator.com', '1112f57e36bdecae70244ddb784e28f7dc78fcbd60b35cd57056f806aa66f3a6', '480-249-5816', '22333 Arapahoe Road', '1996-04-14', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('b8d4d5cb-cf0f-4972-9e05-1b7eebc38732', 'Dick Banes', 'dbanes8@google.es', 'd43ef4ad54532cd182f7a8b790930831848120d59e41c7e2e8bb46f784a541a2', '561-936-2648', '1191 Forest Run Park', '1998-07-05', 'paciente', 'INVALIDO');
insert into paciente (identificacion, nombre, email, password, telefono, direccion, fecha_nacimiento, rol, status) values ('0618d58d-ca71-4752-b92d-6305e19d6e92', 'Francesco Plaister', 'fplaister9@tumblr.com', 'e65115fb2b2b199e8e8a8fb7a94869a7d0587b8bbcbd6ae578f0d4e4ca00ddff', '607-386-9293', '3672 Petterle Alley', '1965-06-20', 'paciente', 'INVALIDO'), 'paciente', 'INVALIDO';

insert into hospital (identificacion, nombre, email, password, telefono, direccion, servicio_medico, rol, status) values ('bb337e14-9088-4f2f-a59d-717c714d508f', 'Supervalu Inc', 'cdrackford0@bravesites.com', 'a26877f90bf2c22e45076c877fe9708afb682d77bff67539250836286751421f', '377-802-5903', '4 Almo Parkway', 'Pediatría', 'hospital', 'INVALIDO');
insert into hospital (identificacion, nombre, email, password, telefono, direccion, servicio_medico, rol, status) values ('a694691a-2bb0-47fa-a13e-4fb66f22ff97', 'Premium Formulations LLC', 'sadelberg2@arizona.edu', '3503d3a1c375df22eb395a09add5d1778d3d243105f96341b7ab53a3eaf04f62', '644-215-3693', '74 Portage Trail', 'Cardiología', 'hospital', 'INVALIDO');

insert into medico (identificacion, nombre, email, password, telefono, direccion, rol, status) values ('7d3c8828-4ca9-4aaa-828e-185ffed45e94', 'Josselyn Beyer', 'jbeyer0@cafepress.com', '7d00f7a01499a09d8d4413d9e0b9949dc4bfdad532a7107e74a54bd9dccde423', '849-263-1777', '74 Karstens Way', 'medico', 'INVALIDO');
insert into medico (identificacion, nombre, email, password, telefono, direccion, rol, status) values ('7112e9c3-b653-49bc-a8ef-e4eef9c45c97', 'Doris Dwane', 'ddwane1@cam.ac.uk', 'c39f0bcd4994c7d7c19830fe4a9f88055789525919dd44140a0a9f03d92b1ecc', '458-938-1194', '8295 Granby Drive', 'medico', 'INVALIDO');
insert into medico (identificacion, nombre, email, password, telefono, direccion, rol, status) values ('b7eb456c-d01b-4d8b-9749-7ac0a51ae0c8', 'Mehetabel Gascar', 'mgascar2@jiathis.com', '33a9314bb8b3bdad186d43875ce7222546b9985eb9820556990efffcc3bb1091', '188-174-1457', '94 Tennessee Court', 'medico', 'INVALIDO');
insert into medico (identificacion, nombre, email, password, telefono, direccion, rol, status) values ('b6e49df1-0265-4c4b-8b09-a31878b0ad22', 'Chelsey Somerton', 'csomerton3@vistaprint.com', '15998634f3157e1006b55674a10b991c3faf77b9ea81d15a7f651ef02aba8727', '466-429-6243', '7199 Hazelcrest Court', 'medico', 'INVALIDO');
insert into medico (identificacion, nombre, email, password, telefono, direccion, rol, status) values ('341d8860-178c-4b58-beaa-c264734e3ea9', 'Dan Kochl', 'dkochl4@storify.com', '23d94d76d0c63bdce552d42a545b1da8f4719762002e548e058d01abb0d62fbf', '308-879-8077', '7 Hallows Park', 'medico', 'INVALIDO');

insert into observacion (especialidad_medica, estado_salud, detalle, id_hospital, id_medico, id_paciente) values ('Especialidad en Gastroenterología', 'Enfermedad leve o lesión leve', 'Infective myositis, left toe(s)', 'bb337e14-9088-4f2f-a59d-717c714d508f', '7d3c8828-4ca9-4aaa-828e-185ffed45e94', '108db892-0a9a-47da-a2ed-40f3ea03e28e');
insert into observacion (especialidad_medica, estado_salud, detalle, id_hospital, id_medico, id_paciente) values ('Especialidad en Neumología Clínica', 'Estado menos grave', 'bb337e14-9088-4f2f-a59d-717c714d508f', '7112e9c3-b653-49bc-a8ef-e4eef9c45c97', '5ac91987-78ad-4a30-a651-5efff726b4ea');
insert into observacion (especialidad_medica, estado_salud, detalle, id_hospital, id_medico, id_paciente) values ('Especialidad en Gastroenterología', 'Estado menos grave', 'Unspecified car occupant injured in collision with railway train or railway vehicle in traffic accident, initial encounter', 'bb337e14-9088-4f2f-a59d-717c714d508f', '7d3c8828-4ca9-4aaa-828e-185ffed45e94', '16749632-b875-4c1b-96d8-2c8e5cfd8614');
insert into observacion (especialidad_medica, estado_salud, detalle, id_hospital, id_medico, id_paciente) values ('Especialidad en Hematología', 'Estado crítico', 'Posterior displaced fracture of sternal end of right clavicle, initial encounter for closed fracture', 'a694691a-2bb0-47fa-a13e-4fb66f22ff97', 'b6e49df1-0265-4c4b-8b09-a31878b0ad22', '46e621d4-e59e-46a9-b6d5-6af0f3dac48d');
insert into observacion (especialidad_medica, estado_salud, detalle, id_hospital, id_medico, id_paciente) values ('Especialidad en Medicina Interna', 'Estado, enfermedad o lesión muy grave', 'Age-related osteoporosis with current pathological fracture, right lower leg', 'a694691a-2bb0-47fa-a13e-4fb66f22ff97', '341d8860-178c-4b58-beaa-c264734e3ea9', '1c769c2c-5a24-4104-8519-04b0a8214008');

