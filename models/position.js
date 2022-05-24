const { model, Schema } = require('mongoose')

const positionSchema = new Schema(
    {
      player: { type: Schema.Types.ObjectId },
      match: { type: Schema.Types.ObjectId },
      pos: String
    }
  )

const Position = model('Position', positionSchema)

module.exports = Position