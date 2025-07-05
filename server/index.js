const http = require('http');
const { Server } = require('socket.io');
const httpserver = http.createServer();
const PORT = process.env.PORT || 5000;
const io = new Server(httpserver, {
    cors: {
        origin: "*"
    }
});
let clientarr = [];
io.on('connection', (socket) => {
    console.log('Client connected');
    //Join user list from client
    socket.on("JoinChat", (name) => {
        clientarr = clientarr.filter(user => user.name !== name);
        clientarr.push({ name, socketId: socket.id });
        console.log("List Of users", clientarr);
        // console.log(`Name of Client ${name}`);
        io.emit("SendUserList", clientarr);
    });
    //updated list from client and also send the list 
    socket.on('RequestUserList', () => {
        io.emit("SendUserList", clientarr);
    })
    //receive msg from client 
    socket.on("SendMsgFromClient", (item) => {
        console.log("msg from client", item);
        console.log("List of users for match id", clientarr);
        const receivers = item?.receiver;
        if (!receivers) return;

        const receiverList = Array.isArray(receivers) ? receivers : [receivers];
        console.log("receiver", receiverList);

        receiverList.forEach(name => {
            const user = clientarr.find(u => u.name === name);
            if (user) {
                console.log(`Receiver: ${name}, Socket ID: ${user.socketId}`);
                io.to(user.socketId).emit("SendMsgToReceiver", item);
            } else {
                console.log(`Receiver ${name} not found in client list`);
            }
        });
    });
});


httpserver.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});