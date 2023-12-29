import express from "express";
import logger from 'morgan';
import http from 'http'; // Importa http directamente

import { Server } from "socket.io"
import { Socket } from "dgram";

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app); // Utiliza http directamente
const io = new Server(server,{
    connectionStateRecovery: {}
});

io.on('connection', (socket) => {
    console.log('a user has connected!');

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log(`server running on port ${port}`);
});


