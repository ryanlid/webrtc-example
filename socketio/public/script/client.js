const username = document.querySelector('#username');
const inputRoom = document.querySelector('input#room');
const btnConnect = document.querySelector('button#connect');
const outputArea = document.querySelector('textarea#output');
const inputArea = document.querySelector('textarea#input');
const btnSend = document.querySelector('button#send');
let socket;
let room;
btnConnect.addEventListener('click', () => {
  socket = io.connect();
  //  收到加入成功消息
  socket.on('joined', (room, id) => {
    btnConnect.disabled = true;
    inputArea.disabled = false;
    btnSend.disabled = false;
  });

  //  收到离开的消息
  socket.on('leaved', (room, id) => {
    btnConnect.disabled = false;
    inputArea.disabled = true;
    btnSend.disabled = true;
  });

  //  收到消息
  socket.on('message', (room, id, data) => {
    outputArea.value = outputArea.value + data + '\r';
  });

  room = inputRoom.value;
  socket.emit('join', room);

  //  发送消息
  socket.send();
});

btnSend.addEventListener('click', (e) => {
  e.preventDefault()
  let data = inputArea.value;
  data = username.value + ':' + data;
  socket.emit('message',room,data);
  inputArea.value = ''
});
