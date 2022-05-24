const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Home = require('./controllers/HomeController');
const MatchController = require('./controllers/MatchController');
const PlayerController = require('./controllers/PlayerController');
const PositionController = require('./controllers/PositionController');
const indexControllers = require('./controllers/indexControllers');
const AttachController = require('./controllers/AttachController');

mongoose.connect('mongodb://localhost:27017/test_project');

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', indexControllers);

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

const port = 3000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})