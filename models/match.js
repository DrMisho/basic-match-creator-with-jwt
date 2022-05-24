const { model, Schema } = require('mongoose')

const matchSchema = new Schema(
    {
      id: Number,
      Team1_name: String,
      Team2_name: String,
      date: {
        type: Date,
        default: new Date()}
    }
  )
  
const Match = model('Match', matchSchema)

module.exports = Match