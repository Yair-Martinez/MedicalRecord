
# Medical Record

Proyecto Backend REST API creado con Node.js y PostgreSQL.


## Referencia de la API

### Entidad Paciente

#### Obtener todos los Pacientes

```http
  GET /api/paciente/get
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `N/A` | `N/A` | Obtiene un array de objetos con todos los pacientes. |

#### Crear nuevo Paciente

```http
  POST /api/paciente/registro
```

| Body | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, email, password, telefono}` | `json` | **Obligatorio** Body. |

#### Iniciar sesión como Paciente 

```http
  POST /api/paciente/login
```

| Body | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, password}` | `json` | **Obligatorio** Body. |

#### Actualizar datos del Paciente

```http
  PATCH /api/paciente/agregar/${id}
```

| Parameter | Body     | Token     | Description                       |
| :-------- | :------- | :-------- | :-------------------------------- |
| `id`      | `{nombre, direccion, fechaNacimiento}` | `app_key` | **Obligatorio**. Id, el body y el Token de Autenticación |

***

### Entidad Hospital

#### Obtener todos los Hospitales

```http
  GET /api/hospital/get
```

| Parámetro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `N/A` | `N/A` | Obtiene un array de objetos con todos los hospitales. |

#### Crear nuevo Hospital

```http
  POST /api/hospital/registro
```

| Body | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, email, password, telefono}` | `json` | **Obligatorio** Body. |

#### Iniciar sesión como Hospital 

```http
  POST /api/hospital/login
```

| Body | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `{identificacion, password}` | `json` | **Obligatorio** Body. |

#### Actualizar datos del Hospital

```http
  PATCH /api/hospital/agregar/${id}
```

| Parameter | Body     | Token     | Description                       |
| :-------- | :------- | :-------- | :-------------------------------- |
| `id`      | `{nombre, direccion, servicioMedico}` | `app_key` | **Obligatorio**. Id, el body y el Token de Autenticación |

***


