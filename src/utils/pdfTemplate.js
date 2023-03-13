module.exports = pdfTemplate = (data) => {
  resultado = `
  <html lang="es">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Index</title>
    <style>
      body {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      }

      h1 {
        text-align:center;
      }

      table {
        margin: 1rem;
        border-collapse: collapse; 
        border: 1px solid black;
      }

      th,td {
        padding: 8px;
      }

      th {
        font-weight: bold;
      }

      tbody tr:nth-child(odd) {
        background-color: #eee;
      }
      
      tbody tr:nth-child(even) {
        background-color: #fff;
      }
    </style>
  </head>

  <body>
    <h1>Observaciones Médicas</h1>

    <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Especialidad Médica</th>
        <th>Estado de Salud</th>
        <th>Detalle</th>
        <th>Hospital</th>
        <th>Médico</th>
        <th>Paciente</th>
      </tr>
    </thead>
  
    <tbody>
  `;

  for (const paciente of data) {
    resultado += `
      <tr>
        <td>${paciente.id}</td>
        <td>${paciente.especialidad_medica}</td>
        <td>${paciente.estado_salud}</td>
        <td>${paciente.detalle}</td>
        <td>${paciente.nombre_hospital}</td>
        <td>${paciente.nombre_medico}</td>
        <td>${paciente.nombre_paciente}</td>
      </tr>
    `;
  }

  resultado += `
      </tbody>
    </table>
  </body>
  </html>
  `;

  return resultado;
};