const { Server } = require("socket.io");

const io = new Server({ cors:"http://localhost:3000" });

io.on("connection", (socket) => {
  console.log(`người dùng ${socket.id} vừa kết nối`);

  socket.on('send-comment', function(data) {
    io.sockets.emit('get-comments', data);
  })

  socket.on('disconnect', function() {
    console.log(`người dùng ${socket.id} đã ngắt kết nối`);
  })


});

io.listen(8000, () => {
    console.log('Server socket is running');
});