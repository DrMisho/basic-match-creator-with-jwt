const User = require('../models/user');
const bcrypt = require('bcrypt');

async function registerPage (req, res) {
    res.render('register-admin',{
        title: "Register"
    })
    
} 

async function registerAdmin (msg) {
    
    const hashedPassword = await bcrypt.hash(msg.password, 10)
    const error = await User.create({username: msg.name, password: hashedPassword, admin: 1});
    
} 


module.exports = {registerPage, registerAdmin};