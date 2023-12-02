const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const DenunciaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  document: {
    type: Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });