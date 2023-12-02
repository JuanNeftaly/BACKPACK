const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const DocumentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  materia: {
    type: String,
    required: true,
  },
  temas: {
    type: [String],
    required: true,
  },
  clasificacion: {
    type: String,
    required: true,
  },
  // * URL del documento
  url: {
    type: String,
    required: true,
  },
  annioPublicacion: {
    type: String,
    required: true,
  },
  cicloPublicacion: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [],
    ref: "User",
    default: [],
  }
}, { timestamps: true });

module.exports = Mongoose.model("Document", DocumentSchema);