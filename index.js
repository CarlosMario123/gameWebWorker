const express = require('express');
const path = require('path');
const app = express();

// Establecer el puerto, usa el proporcionado por Render o un puerto local
const port = process.env.PORT || 8080;

// Servir archivos estáticos (index.html, game.js, worker.js, style.css)
app.use(express.static(path.join(__dirname)));

// Cualquier ruta que no sea específica se redirige al archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
