const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const AuthenticateToken = require('./middleware/AuthenticateToken');

const Home = require('./controllers/HomeController');
const MatchController = require('./controllers/MatchController');
const PlayerController = require('./controllers/PlayerController');
const PositionController = require('./controllers/PositionController');
const indexControllers = require('./controllers/indexControllers');
const AttachController = require('./controllers/AttachController');
const RegisterAdminController = require('./controllers/RegisterAdminController');
const AuthenicationController = require('./controllers/AuthenicationController');

mongoose.connect('mongodb://localhost:27017/test_project');

app.use(express.json())
app.use(cookieParser());

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', indexControllers);

app.post('/login', AuthenicationController);

app.get('/home', AuthenticateToken.requireAuth , Home.home);

app.get('/get-match/:id', AuthenticateToken.requireAuth, MatchController.getMatch);
app.get('/edit-match/:id', AuthenticateToken.requireAuth , MatchController.editMatchGet);
app.post('/edit-match/:id',AuthenticateToken.requireAuth,  MatchController.editMatchPost);

app.get('/get-player/:id',AuthenticateToken.requireAuth, PlayerController.getPlayer);
app.get('/edit-player/:id', AuthenticateToken.requireAuth, PlayerController.editPlayerGet);
app.post('/edit-player/:id',AuthenticateToken.requireAuth,  PlayerController.editPlayerPost);

app.get('/edit-position/:id1/:id2',AuthenticateToken.requireAuth, PositionController.editPositionGet);
app.post('/edit-position/:id1/:id2',AuthenticateToken.requireAuth, PositionController.editPositionPost);

app.get('/add-match',AuthenticateToken.requireAuth, MatchController.addMatchGet);
app.post('/add-match',AuthenticateToken.requireAuth, MatchController.addMatchPost);

app.get('/add-player',AuthenticateToken.requireAuth, PlayerController.addPlayerGet);
app.post('/add-player', AuthenticateToken.requireAuth, PlayerController.addPlayerPost);

app.get('/attach-player', AuthenticateToken.requireAuth,  AttachController.attachGet);
app.post('/attach-player',AuthenticateToken.requireAuth,  AttachController.attachPost);

app.get('/register-admin', AuthenticateToken.requireAuth, RegisterAdminController.registerPage);

app.get('/logout', Home.logout )

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', function(msg){
        RegisterAdminController.registerAdmin(msg)

    })
  });
  
const port = 3000;
server.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})