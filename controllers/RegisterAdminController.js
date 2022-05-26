const User = require('../models/user');
const bcrypt = require('bcrypt');

async function registerPage (req, res) {
    res.render('register-admin',{
        title: "Register"
    })
    
} 

async function registerAdmin (msg) {
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(msg.password, salt)
    const error = await User.create({username: msg.name, password: hashedPassword, admin: 1});
    
} 


module.exports = {registerPage, registerAdmin};