const Player = require('../models/player');
const Match = require('../models/match');
const Position = require('../models/position');

module.exports = async (req,res) => {
    const Matches = await Match.find({});
    const Players = await Player.find({});
    res.render('home',{
        title: "Home",
        Matches,
        Players
    });
}