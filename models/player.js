const { model, Schema } = require('mongoose')

const playerSchema = new Schema(
    {
      name: 
      {
        type: String,
        required: [true, 'Name must not be empty']
      },
      fixed: String
    }
  )

const Player = model('Player', playerSchema)

module.exports = Player