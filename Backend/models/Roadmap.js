import mongoose from "mongoose"

const roadmapSchema = new mongoose.Schema({

  goal: String,

  roadmap: {
    type: Object
  },

  userEmail: String

}, {
  timestamps: true
})

export default mongoose.model(
  "Roadmap",
  roadmapSchema
)