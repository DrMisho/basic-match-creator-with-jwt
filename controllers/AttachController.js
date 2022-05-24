const Player = require('../models/player');
const Position = require('../models/position');
const Match = require('../models/match');

async function attachGet (req, res) {
    const players = await Player.find({});
    const matches = await Match.find({});
    res.render('attach-player',{
        title: "Attach Player",
        players,
        matches
    })
}

async function attachPost (req, res) {
    var name = req.body.name;
    var id = req.body.id;
    var pos = req.body.position;
    const player = await Player.findOne({name: name});
    const match = await Match.findOne({id: id});
    const error = await Position.create({player: player._id, match: match._id, pos: pos});
    res.redirect('/home');
}

module.exports = {attachGet, attachPost}