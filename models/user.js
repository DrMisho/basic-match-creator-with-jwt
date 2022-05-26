const { model, Schema } = require('mongoose')

const UserSchema = Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    admin: {
        type: Number,
        default: 0
    }
})

const User = model('User', UserSchema);

module.exports = User