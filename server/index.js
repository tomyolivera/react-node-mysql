const express = require('express');
                require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');
const { connection, insert } = require('./database');

// Connect Database
connection.connect(err => {
    if(err) throw err;
})

// Create Server
const app = express();

app.get('/api/login', (req, res) => {
    const user = {
        email: "pedro@gmail.com",
        password: "pedro123",
    }

    const accessToken = generateAccessToken(user);
    res.send(accessToken);
});

app.post('/api/login', validateToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (error, user) => {
        
    });
});

const cors_options = {
    cors: true,
    origin: ['http://localhost:3000']
}

const server = http.createServer(app);

const io = socketio(server, cors_options);

io.on('connection', socket => {
    socket.on('user-created', (user, callback) => {
        insert(connection, user, callback);
    });
});

// Access Token with JWT
const generateAccessToken = user => {
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "3m"})
}

const validateToken = (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if(!accessToken) res.send("Access denied");

    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if(err){
            res.send("Access denied. Token expired or incorrect");
        }else{
            next();
        }

    });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));