const bcrypt = require('bcrypt');
const User = require('../models/user'); 
const jwt = require('jsonwebtoken');
require('dotenv').config()

const maxAge = 3 * 24 * 60 * 60;

module.exports = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({username: username});
    console.log(user);
    if(user)
    {
        if(await bcrypt.compare(password, user.password))
        {
            
            jwt.sign({ u: user._id }, process.env.ACCESS_TOKEN_SECRET , (err, token) => {
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(200).json({ user: user._id });
            });
                  
        }
    }
    else
    {
        return res.status(404).send('User account not found.');
    }

}

  