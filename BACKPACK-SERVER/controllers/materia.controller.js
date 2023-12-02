const Materia = require("../models/Materia.model");
const { uploadFile } = require("../utils/cloudinary.tools");
const debug = require("debug")("app:materia-controller");
const fs = require('fs');

const controller = {};

controller.createMateria = async (req, res, next) => {
  try {
    // const result = await uploadFile(req.file.path);
    // const imageUrl = result.url;

    // console.log(imageUrl);
    // fs.unlinkSync(req.file.path);

    const { codigo, name, carreras, imgUrl } = req.body;

    const materia = new Materia({
      codigo: codigo,
      name: name,
      carreras: carreras.split(", "),
      imgUrl: imgUrl,
    });

    const materiaSaved = await materia.save();

    if (!materiaSaved) {
      // ! Conflicto
      return res.status(509).json({ error: "Error creating Materia" })
    }

    return res.status(201).json(materiaSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

controller.findAll = async (req, res, next) => {
  try {
    const materias = 
      await Materia.find();
    
    return res.status(200).json({ materias });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error controller" });
  }
}

controller.findByCarreer = async (req, res, next) => {
  try {
    const user = req.user;
    const { carrera } = user;    
    const materias = 
      await Materia.find({carreras: carrera});

    if (!materias) {
      return res.status(404).json({ error: "Materias not found" });
    }

    return res.status(200).json({ materias });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.deleteById = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const materia = await Materia.findByIdAndDelete({ _id: identifier });

    if (!materia) {
      return res.status(404).json({ error: "Materia not found" });
    }

    return res.status(200).json({ message: "Materia deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = controller;