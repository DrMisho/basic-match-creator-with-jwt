const Player = require('../models/player');
const Match = require('../models/match');
const Position = require('../models/position');

async function home (req,res) {
    const Matches = await Match.find({});
    const Players = await Player.find({});
    res.render('home',{
        title: "Home",
        Matches,
        Players
    });
}
function logout (req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = {home , logout}