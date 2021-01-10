const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  socket.on('mouse move', (xPos, yPos) => {
      io.emit('mouse move', xPos, yPos);
      console.log(xPos + '/' + yPos);
  })


});

http.listen(3000, () => {
  console.log('listening on *:3000');
});