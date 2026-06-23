import mongoose from "mongoose"

const messageSchema =
  new mongoose.Schema({

    role: String,

    text: String,

  })

const chatHistorySchema =
  new mongoose.Schema({

    userEmail: {

      type: String,

      required: true,

    },

    messages: [

      messageSchema,

    ],

  },

  {
    timestamps: true,
  }
)

export default mongoose.model(

  "ChatHistory",

  chatHistorySchema
)