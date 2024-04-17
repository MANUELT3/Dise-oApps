// server.js
const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyectotextil2'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

app.use(express.json());
// Catalogo
app.get('/api/vestidos', (req, res) => {
  connection.query('SELECT * FROM vestidos', (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener datos de los vestidos' });
    } else {
      res.json(results);
    }
  });
});


// login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  connection.query('SELECT * FROM usuarios WHERE nombreUser = ? AND password = ?', [username, password], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    } else {
      if (results.length > 0) {
        const userData = results[0];
        res.json({ success: true, user: userData });
      } else {
        res.json({ success: false });
      }
    }
  });
});

// Agregar vestido
app.post('/api/vestido', (req, res) => {
  const { codigo, nombre, talla, descripcion, precioVenta} = req.body;
  connection.query('INSERT INTO vestidos (codigo, nombre, talla, descripcion, precioVenta) VALUES (?, ?, ?, ?, ?)', [codigo, nombre, talla, descripcion, precioVenta], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Error al agregar el vestido' });
    } else {
      res.json({ success: true, message: 'Vestido agregado correctamente' });
    }
  });
});


// Cerrar sesión
app.post('/api/logout', (req, res) => {
  res.json({ success: true });
});



app.listen(port, () => {
  console.log(`Servidor backend iniciado en ${port}`);
});
