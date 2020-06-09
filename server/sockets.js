const socketIO = require('socket.io');

module.exports = {

  init(server) {
    this.sessions = [];
    this.io = socketIO(server);
    this.io.on('connection', (socket) => {
      this.onConnection(socket)
    });
  },
  // находит сессию в которой есть сокет игрока, но нет противника (игрок ждет противника)
  getPendingSession() {
    return this.sessions.find(session => session.playerSocket && !session.enemySocket)
  },
  createPendingSession(socket) {
    const session = {playerSocket: socket, enemySocket: null};
    this.sessions.push(session)
  },
  startGame(session) {
    session.playerSocket.emit('gameStart');
    session.enemySocket.emit('gameStart');

  },
  onConnection(socket) {
    console.log('new user connected', socket.id)

    // получить текущую ожидающую игровую сессию
    let session = this.getPendingSession();


    if (!session) { // если такой сессии нет - создать игровую сессию и поместить в нее игрока
      this.createPendingSession(socket)
    } else { // если такая сессия есть - добавить в нее сокет противника и запустить игру событием в оба сокета
      session.enemySocket = socket;
      this.startGame(session)
    }


  }
};

