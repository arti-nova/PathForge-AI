import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({

  userEmail: {
    type: String,
    required: true,
  },

  prompt: {
    type: String,
    required: true,
  },

  response: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
})

export default mongoose.model(
  "Chat",
  chatSchema
)