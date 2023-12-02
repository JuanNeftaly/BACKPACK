const Denuncia = require('../models/Denuncia.model');

const controller = {};

controller.create = async (req, res, next) => {
  try {
    const { title, document } = req.body;
    const { user } = req;

    const denuncia = new Denuncia({
      title: title,
      document: document,
      user: user._id,
    });

    const denunciaSaved = await denuncia.save();

    if (!denunciaSaved) {
      return res.status(509).json({ error: "Error creating Denuncia" });
    }

    return res.status(201).json(denunciaSaved);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}