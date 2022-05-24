const Player = require('../models/player');
const Position = require('../models/position');
const Match = require('../models/match');

async function getPlayer (req, res) {
    var id = req.params.id;
    var player = await Player.findById(id);
    var positions = await Position.find({player: id});
    var p = [];
    for(var i = 0; i<positions.length; i++)
    {
        const match = await Match.findById(positions[i].match);
        var merge = { pos: positions[i].pos , match};
        p.push(merge);
    }
    console.log(p);
    res.render('player', {
        title: "Player Info",
        player,
        p
    })
}

async function editPlayerGet (req, res) {
    var id = req.params.id;
    var player = await Player.findById(id);
    res.render('edit-player', {
        title: "Edit Player",
        player
    })
}

async function editPlayerPost (req, res) {
    var id = req.params.id;
    const name = req.body.name;
    const error = await Player.updateOne({_id: id}, {name : name});
    if(error)
    {
        console.log(error);
    }
    res.redirect('/get-player/'+id);
}



module.exports = {getPlayer, editPlayerGet, editPlayerPost};