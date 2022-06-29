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
require('dotenv').config()
const path = require('path');
const { resolve } = require('path');
app.use(express.static(path.join(__dirname, 'public')))

const setCount = 0

const {userJoin, getCurrentUser, userLeave, getUsers} = require('./utils/users')
const botName = 'bot'
app.use(express.static(path.join(__dirname, 'public')))


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'gersonDB'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
    const getsonCounters = db.collection('counts')

    
io.on('connection', (socket) => {

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    
    app.get('/', (req, res) => {
        res.sendFile(response.sendFile(__dirname + '/index.html'))
    })

    db.collection('counts').find().toArray()
    .then(result => {
        // console.log(result[0].counter)
        count = result[0].counter
        socket.emit('connected', count) 
    })

    
    socket.on('fGerson', () => {
            db.collection('counts').findOneAndUpdate(
                {},
                {
                  $inc: {
                    counter: 1
                  }
                },
                {
                  upsert: true
                }
              )
                .then(result => {
                    socket.broadcast.emit('fGers')})
                .catch(error => console.error(error))   
    })


    socket.on('lGerson', () => {
        db.collection('counts').findOneAndUpdate(
            {},
            {
              $inc: {
                counter: -1
              }
            },
            {
              upsert: true
            }
        )
        .then(result => {
            socket.broadcast.emit('fGers')})
        .catch(error => console.error(error))   
    })

    // app.post('/fgers', (req, res) => {
    //     console.log(req.body)
    //     db.collection('counts').insertOne(req.body)
    //       .then(result => {
    //         res.json('Success')
    //       })
    //       .catch(error => console.error(error))
    //   })

    socket.on('joinRoom', () => {

        const user = userJoin(socket.id, username, room, color)
        // console.log(getCurrentUser(socket.id))
    
          // Welcome message for current user only
        socket.emit('connected', formatMessage(botName, 'Welcome to the chat')) 
    
        // Sends to everyone but the current user
        socket.broadcast.emit('connected', formatMessage(botName, `<span style= 'color:${user.color};'>`+user.username+'</span>'+ " has connected to the chat"))
    
        
        // on chat message send out message to all users
        socket.on('chat message', (msg) => {
          const user = getCurrentUser(socket.id)
          io.emit('chat message', formatMessage(user.username, msg, user.color));
        })
    })



    console.log('Connected to server')
})
})



function getCount() {
    let count = 0
    console.log(db.collection('counts').find().toArray()
        .then(result => {
            // console.log(result[0].counter)
            count = result[0].counter
            return count
        }))

        
        
}


server.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
