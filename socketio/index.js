const http = require('http');
const https = require('https');
const fs = require('fs');

const express = require('express');
const serveIndex = require('serve-index');

const SocketIO = require('socket.io');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'app.log',
      layout: {
        type: 'pattern',
        pattern: '%r %p - %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['file'],
      level: 'debug',
    },
  },
});

const logger = log4js.getLogger();
const app = express();

app.use(serveIndex('/public'));
app.use(express.static('./public'));

// const options = {
//   key: fs.readFileSync('./cert/cert.key'),
//   cert: fs.readFileSync('./cert/cert.pem'),
// };

// http server
const http_server = http.createServer(app);
http_server.listen(8080, '0.0.0.0');
const io = SocketIO.listen(http_server);

// // https server
// const https_server = https.createServer(options, app);
// const io = SocketIO.listen(https_server);
// https_server.listen(443, '0.0.0.0');

io.sockets.on('connection', (socket) => {
  // socket 为每个客户端

  socket.on('join', (room) => {
    // 加入房间
    socket.join(room);

    const myRoom = io.sockets.adapter.rooms[room];
    console.log(myRoom)
    // 获取房间用户数
    const users = Object.keys(myRoom.sockets).length;
    logger.log('the number of user in room is: ' + users);
    // // 回复发送者
    // socket.emit('joined',room,socket.id);
    // // 给房间除自己其他人发送
    // socket.to(room).emit('joined',room,socket.id)
    // // 给房间所有人发送
    // io.in(room).emit('joined',room,socket.id);

    // 给除自己全部人发送
    socket.broadcast.emit('joined', room, socket.id);
  });

  socket.on('leave', (room) => {
    const myRoom = io.sockets.adapter.rooms[room];
    // 获取房间用户数
    const users = Object.keys(myRoom.socket).length;
    logger.log('the number of user in room is: ' + users);
    // 离开房间
    socket.leave(room);
    logger.log('the number of user in room is leave: ' + users);
    // // 回复发送者
    // socket.emit('joined', room, socket.id);
    // // 给房间除自己其他人发送
    // socket.to(room).emit('joined', room, socket.id);
    // // 给房间所有人发送
    // io.in(room).emit('joined', room, socket.id);

    // 给除自己全部人发送
    socket.broadcast.emit('leaved', room, socket.id);
  });
});
