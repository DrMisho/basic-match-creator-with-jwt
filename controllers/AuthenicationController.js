const bcrypt = require('bcrypt');
const User = require('../models/user'); 
module.exports = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username: username});
    console.log(user);
    if(user)
    {
        if(await bcrypt.compare(password, user.password))
        {
            
            res.redirect('/home');        
        }
    }

}