const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const logFile = '/var/log/app/app.log';
fs.mkdirSync(path.dirname(logFile), { recursive: true });

function writeLog(level, msg) {
  const line = `${new Date().toISOString()} [${level}] ${msg}\n`;
  // stdout
  if (level === 'ERROR') console.error(line.trim());
  else console.log(line.trim());
  // archivo
  fs.appendFileSync(logFile, line);
}

app.get('/', (req, res) => {
  writeLog('INFO', 'root hit');
  res.send('Hello — Logs  simple simulacion');
});

app.get('/error', (req, res) => {
  writeLog('ERROR', 'Simula un log de error');
  res.status(500).send('Error logged');
});

app.get('/user/:id', (req, res) => {
  writeLog('INFO', `usario de id: ${req.params.id} visito la pagina`);
  res.send(`user ${req.params.id}`);
});

app.listen(port, () => {
  writeLog('INFO', `App activa en puerto ${port}`);
});