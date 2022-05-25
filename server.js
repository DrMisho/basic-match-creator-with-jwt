const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');



app.get('/', indexControllers);

app.post('/login', AuthenicationController);

app.get('/home', Home);

app.get('/get-match/:id', MatchController.getMatch);
app.get('/edit-match/:id', MatchController.editMatchGet);
app.post('/edit-match/:id', MatchController.editMatchPost);

app.get('/get-player/:id', PlayerController.getPlayer);
app.get('/edit-player/:id', PlayerController.editPlayerGet);
app.post('/edit-player/:id', PlayerController.editPlayerPost);

app.get('/edit-position/:id1/:id2',PositionController.editPositionGet);
app.post('/edit-position/:id1/:id2',PositionController.editPositionPost);

app.get('/add-match', MatchController.addMatchGet);
app.post('/add-match', MatchController.addMatchPost);

app.get('/add-player', PlayerController.addPlayerGet);
app.post('/add-player', PlayerController.addPlayerPost);

app.get('/attach-player', AttachController.attachGet);
app.post('/attach-player', AttachController.attachPost);

app.get('/register-admin', RegisterAdminController.registerPage)

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

