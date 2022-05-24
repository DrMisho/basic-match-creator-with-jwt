const Player = require('../models/player');
const Position = require('../models/position');
const Match = require('../models/match');

async function editPositionGet (req, res) {
    var id_player = req.params.id1;
    var id_match = req.params.id2;
    var position = await Position.findOne({$and: [ {player: id_player} , {match: id_match} ]})
    res.render('edit-position', {
        title: "Edit Position",
        position
    })
}

async function editPositionPost (req, res) {
    var id_player = req.params.id1;
    var id_match = req.params.id2;
    const error = await Position.updateOne({$and: [ {player: id_player} , {match: id_match} ]}, {pos: req.body.position});
    if(error)
    {
        console.log(error);
    }
    res.redirect('/get-player/'+id_player);
}



module.exports = {editPositionGet, editPositionPost};