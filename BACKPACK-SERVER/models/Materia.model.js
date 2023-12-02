const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const MateriaSchema = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  carreras: {
    type: [String],
    required: true,
  }, 
  imgUrl: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = Mongoose.model("Materia", MateriaSchema);