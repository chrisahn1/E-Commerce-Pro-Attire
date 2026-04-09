require('dotenv').config();
const express = require('express');
const argon2 = require('argon2');
const http = require('http');
const cors = require('cors');
const app = express();
const path = require('path');
// const reactStaticDir = path.join(__dirname, '../client/build');
// app.use(express.static(reactStaticDir));
app.use(express.json());

app.use(
  '/api',
  cors({
    origin: ['http://localhost:3001'],
  })
);
//************************************************************* */

//************************************************************* */

const reactStaticDir = path.join(__dirname, '../client/dist');
app.use(express.static(reactStaticDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(reactStaticDir, 'index.html'));
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});

//CLIENT PACKAGE.JSON(INITIAL)
// "scripts": {
//     "dev": "vite",
//     "build": "tsc && vite build",
//     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
//     "preview": "vite preview"
//   },

//SERVER PACKAGE.JSON(INITIAL)
// "scripts": {
//     "start": "tsx server.ts",
//     "dev": "tsx watch server.ts",
//     "lint": "eslint . --ext ts,js --report-unused-disable-directives --max-warnings 0"
//   },
