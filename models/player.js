const { model, Schema } = require('mongoose')

const playerSchema = new Schema(
    {
      name: 
      {
        type: String,
        required: [true, 'Name must not be empty']
      }
    }
  )

const Player = model('Player', playerSchema)

module.exports = Player