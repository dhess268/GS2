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

    // app.post('/fgers', (req, res) => {
    //     console.log(req.body)
    //     db.collection('counts').insertOne(req.body)
    //       .then(result => {
    //         res.json('Success')
    //       })
    //       .catch(error => console.error(error))
    //   })





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


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

function getCount(){
    
}