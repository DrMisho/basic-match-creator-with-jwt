const { model, Schema } = require('mongoose')

const matchSchema = new Schema(
    {
      Team1_name: String,
      Team2_name: String,
      date: {
        type: Date,
        default: new Date()}
    }
  )
  
const Match = model('Match', matchSchema)

module.exports = Match