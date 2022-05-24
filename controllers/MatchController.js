const Match = require('../models/match')

async function getMatch (req, res) {
    var id = req.params.id;
    var match = await Match.findById(id);
    res.render('match', {
        title: "match",
        match
    })
}

async function editMatchGet (req, res) {
    var id = req.params.id;
    var match = await Match.findById(id);
    res.render('edit-match', {
        title: "match",
        match
    })
}

async function editMatchPost (req, res) {
    var id = req.params.id;
    const team1 = req.body.team1;
    const team2 = req.body.team2;
    const date = new Date();
    const error = await Match.updateOne({_id: id}, {Team1_name: team1, Team2_name: team2, date: date});
    if(error)
    {
        console.log(error);
    }
    res.redirect('/get-match/'+id)
}



module.exports = {getMatch, editMatchGet, editMatchPost};