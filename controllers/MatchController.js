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

async function addMatchGet (req, res) {
    res.render('add-match',{
        title: "Add Match"
    });
}

async function addMatchPost (req, res) {
    var id = req.body.id;
    var team1_name = req.body.team1;
    var team2_name = req.body.team2;
    if(req.body.date == "")  // if there is no date => default date 
    {
        const error = await Match.create({id: id, Team1_name: team1_name, Team2_name: team2_name});
    }
    else
    {
        var date = new Date(req.body.date)
        const error = await Match.create({id: id, Team1_name: team1_name, Team2_name: team2_name, date: date});
    }
    res.redirect('/home');
}

module.exports = {getMatch, editMatchGet, editMatchPost, addMatchGet, addMatchPost};