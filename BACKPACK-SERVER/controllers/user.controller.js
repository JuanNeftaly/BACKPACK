const User = require("../models/User.model");

const controller = {};

controller.findAll = async (req, res, next) => {
  try {
    const users = 
      await User.find();

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error controller" });
  }
}

controller.deleteById = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const deletedUser = 
      await User.findByIdAndDelete(identifier);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) { 
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error controller" });
  }
}

module.exports = controller;