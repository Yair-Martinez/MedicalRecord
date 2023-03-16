
# Medical Record

Proyecto Backend REST API creado con Node.js y PostgreSQL.


## Referencia de la API

### Entidad Paciente

#### Obtener todos los Pacientes

```http
  GET /api/paciente
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `N/A` | `N/A` | Obtiene un array con todos los pacientes. |

#### Crear nuevo Paciente

```http
  POST /api/paciente/registro
```

| Body      | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, email, password, telefono}` | `json` | Recibe un objeto *JSON* con los campos necesarios y añade un nuevo paciente a la base de datos. |

#### Iniciar sesión como Paciente 

```http
  POST /api/paciente/login
```

| Body      | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, password}` | `json` | Toma las credenciales de acceso del usuario, en caso de ser válidas retorna un token único. |

#### Actualizar datos del Paciente

```http
  PATCH /api/paciente/agregar/${id}
```

| Parámetro | Body     | Header    | Tipo      | Descripción                       |
| :-------- | :------- | :-------- | :-------- | :-------------------------------- |
| `id`      | `{nombre, direccion, fechaNacimiento}` | `Authorization` | `string/json/token` | Recibe tanto un parámetro *id* como un objeto *JSON*, además de un *Token* de acceso (adquirido en la fase de Login) incluido en el header de la petición. En caso de ser válidos se añadirá o actualizará los campos que no fueron introducidos en la fase de registro. |

#### Obtener las observaciones médicas del Paciente

```http
  GET /api/paciente/observaciones
```

| Parámetro | Header      | Tipo       | Descripción                |
| :-------- | :---------- | :--------- | :------------------------- |
| `N/A` | `Authorization` | `token` | Obtiene un array con todas las observaciones médicas realizadas al paciente. |

***

### Entidad Hospital

#### Obtener todos los Hospitales

```http
  GET /api/hospital
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `N/A`     | `N/A`    | Obtiene un array con todos los hospitales. |

#### Crear nuevo Hospital

```http
  POST /api/hospital/registro
```

| Body      | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, email, password, telefono}` | `json` | Recibe un objeto JSON con los campos necesarios y añade un nuevo hospital a la base de datos. |

#### Iniciar sesión como Hospital 

```http
  POST /api/hospital/login
```

| Body      | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, password}` | `json` | Toma las credenciales de acceso del usuario, en caso de ser válidas retorna un token único. |

#### Actualizar datos del Hospital

```http
  PATCH /api/hospital/agregar/${id}
```

| Parámetro | Body     | Header    | Tipo      | Descripción                       |
| :-------- | :------- | :-------- | :-------- | :-------------------------------- |
| `id`      | `{nombre, direccion, servicioMedico}` | `Authorization` | `string/json/token` | Recibe tanto un parámetro *id* como un objeto *JSON*, además de un *Token* de acceso (adquirido en la fase de Login) incluido en el header de la petición. En caso de ser válidos se añadirá o actualizará los campos que no fueron introducidos en la fase de registro. |

#### Obtener las observaciones médicas del Hospital 

```http
  GET /api/hospital/observaciones
```

| Parámetro | Header     | Tipo      | Descripción                |
| :-------- | :--------- | :-------- | :------------------------- |
| `N/A` | `Authorization` | `token`  | Obtiene un array con todas las observaciones médicas realizadas por el hospital. |

#### Crear un nuevo Médico

```http
  POST /api/hospital/registro-medico
```

| Body      | Header    | Tipo      | Descripción                |
| :-------- | :-------- | :-------- | :------------------------- |
| `{identificacion, nombre, email, password, telefono, direccion}` | `Authorization` | `json/token` | Recibe un objeto JSON con los campos necesarios y añade un nuevo médico a la base de datos. |

***

### Entidad Médico

#### Obtener todos los Médicos

```http
  GET /api/medico
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `N/A` | `N/A` | Obtiene un array con todos los médicos. |


#### Iniciar sesión como Médico 

```http
  POST /api/medico/login
```

| Body | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, password}` | `json` | Toma las credenciales de acceso del usuario, en caso de ser válidas retorna un token único. |

#### Obtener las observaciones médicas del Médico 

```http
  GET /api/medico/observaciones
```

| Parámetro | Header     | Tipo      | Descripción                |
| :-------- | :--------- | :-------- | :------------------------- |
| `N/A` | `Authorization` | `token`    | Obtiene un array con todas las observaciones realizadas por el médico. |

#### Crear Observaciones médicas 

```http
  POST /api/medico/observaciones
```

| Body      | Header    | Tipo      | Descripción                |
| :-------- | :-------- | :-------- | :------------------------- |
| `{especialidadMedica, estadoSalud, detalle, idHospital, idMedico, idPaciente}` | `Authorization` | `json/token` | Toma un objeto JSON con los campos necesarios y añade una nueva observación médica a la base de datos. |

***

### Rutas adicionales

#### Validar nuevas cuentas

```http
  GET /comfirm/${token}
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | Extrae el token de la url (obtenida del correo enviado al momento del registro) y procede a validar la cuenta para poder iniciar sesión. |


#### Iniciar el proceso de reinicio de contraseña 

```http
  POST /api/forgot-password
```

| Body      | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{email, rol}` | `json` | Toma el email del usuario, en caso de ser válido se da inicio al cambio de contraseña con el envío de un correo con el token necesario para el proceso. |

#### Cambiar la contraseña 

```http
  POST /api/change-password/${token}
```

| Parámetro | Body     | Tipo     | Descripción                       |
| :-------- | :------- | :-------- | :-------------------------------- |
| `token`      | `{password}` | `string/json` | Recibe tanto un parámetro *token* (adquirido mediante la ruta */forgot-password*), como un objeto *JSON*, en caso de ser válidos se actualiza la nueva contraseña. |

***
