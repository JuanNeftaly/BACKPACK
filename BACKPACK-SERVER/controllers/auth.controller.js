const User = require("../models/User.model");
const ROLES = require("../data/roles.constants.json");

const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
  try {
    // * Obtener informacion 
    const { username, email, carrera, password } = req.body;

    // ? Verificar la existencia del correo 
    const user = 
      await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({ error: "User already exist!" })
    }

    // * Si no existe lo creamos
    const newUser = new User({
      username: username,
      email: email,
      carrera: carrera,
      password: password,
      roles: [ROLES.USER]
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.login = async (req, res, next) => {
  try {
    // * Obtener la informacion -> identificador (correo), password 
    const { identifier, password } = req.body;

    // ? Verificamos si el usuario existe
    const user = 
      await User.findOne({ email: identifier });

    // ! Si no existe -> 404
    if (!user) {
      return res.status(404).json({ error: "These credential dont match our records" });
    }

    // ? Verificamos si la password coincide
    // ! Si la password no coincide -> 401
    if (!user.comparePassword(password)) {
      return res.status(401).json({ error: "These credential dont match our records" });
    }

    // TODO: Si la password coincide -> Loggeamos
    // * Crear token
    const token = await createToken(user._id);

    // ? Verificar la integridad de los tokens actuales - max 5 sesiones  
    let _tokens = [...user.tokens]
    const _verifyPromises = _tokens.map(async (_t) => {
      const status = await verifyToken(_t);
      
      return status ? _t : null;
    });
    
    _tokens = (await Promise.all(_verifyPromises))
      .filter(_t => _t)
      .slice(0, 4);
    
    // * Almacenar token
    _tokens = [token, ..._tokens];
    user.tokens = _tokens;

    await user.save();

    // * Devolver token
    return res.status(200).json({ token })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.whoami = async (req, res, next) => {
  try {
    const { _id, username, email, roles } = req.user;
    return res.status(200).json({
      _id, username, email, roles
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = controller;