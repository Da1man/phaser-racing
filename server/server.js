const PORT = 3000;
const DOCROOT = './../dist/';


//  1. Подключить нужные модули http, path, express

const http = require('http');
const path = require('path');
const express = require('express');

const socketIO = require('socket.io');


//  2. Создать сервер, используя express и http

const app = express();
const server = http.createServer(app);


// 3. Настроить отдачу игры при запросе к серверу

const documentRoot = path.join(__dirname, DOCROOT);
const staticContent = express.static(documentRoot);
app.use(staticContent);


// 4.Запускаем сервер

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
});

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('new user connected', socket.id)
});
