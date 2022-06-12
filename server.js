// const express = require('express')
// const app = new express()
// const path = require('path')
// const http = require('http');
// const server = http.createServer(app);  
// const { Server } = require("socket.io");
// const io = new Server(server);

const express = require('express');

const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 8000;
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// app.use(express.static(path.join(__dirname, 'public')))
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });
MongoClient.connect('mongodb+srv://dhess:Buanimation17!@cluster0.4zb2b.mongodb.net/?retryWrites=true&w=majority',{useUnifiedTopology: true})
.then(client => {
    const db = client.db('gerson-db')
    io.on('connection', (socket) => {
    
        io.on('fGerson', () => {
            socket.broadcast.emit('fGers')
        })
    
    
        console.log('Connected to server')
    })

})




server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})