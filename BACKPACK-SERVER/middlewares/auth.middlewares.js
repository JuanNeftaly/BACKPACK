const debug = require("debug")("app:auth-middleware");
const { verifyToken } = require("../utils/jwt.tools");
const User = require("../models/User.model");

const ROLES = require("../data/roles.constants.json");

const middlewares = {};
const PREFIX = "Bearer";

middlewares.authentication = async (req, res, next) => {
  try {
    // debug("User authentication");

    // ? Verificar el authorization
    const { authorization } = req.headers;

    // ! Si authorization no existe -> 401
    if (!authorization) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // ? Verificar la validez del token
    // * Token -> Bearer uroqweoidfla.lldfsjaksdfahs.fdjsalfjjl
    const [prefix, token] = authorization.split(" ");

    // ! Si prefix no coincide -> 401
    if (prefix !== PREFIX) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // ! Si token no existe -> 401
    if (!token) {
      return res.status(401).json({ error: "User not authenticated" })
    }
    
    // ? Verificando el token 
    const payload = await verifyToken(token);

    // ! Si payload no existe -> 401
    if (!payload) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    const userId = payload["sub"];

    // ? Verificar el usuario
    const user = await User.findById(userId);

    // ! Si usuario no existe -> 401
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    // debug({ user });

    // ? Comparar el token con los tokens registrados
    const isTokenValid = user.tokens.includes(token);
    if (!isTokenValid) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    // * Modificar la req, para anniadir la info del usuario 
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

middlewares.authorization = (roleRequired = ROLES.SYSADMIN) => {
  return (req, res, next) => {
    // * Premisa: Debe de haber pasado por la autenticacion
    // TODO: Hacer que verifique si es un catedratico o un usuario, si es catedratico que no se suban con hidden y si es usuario que se suba con hidden
    try {
      const { roles=[] } = req.user;

      // ? Verificar si el rol requerido esta en la coleccion
      const isAuth = roles.includes(roleRequired);
      const isSysadmin = roles.includes(ROLES.SYSADMIN);

      // ! Si no esta -> 403
      if (!isAuth && !isSysadmin) {
        return res.status(403).json({ error: "Forbbiden" })
      }

      // * Si esta hacemos -> next()
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).jsone({ error: "Internal Server Error" })
    }
  }
}

module.exports = middlewares;