const Document = require("../models/Document.model");
const debug = require("debug")("app:document-controller");
const { uploadFile } = require("../utils/cloudinary.tools");
const fs = require('fs');

const controller = {};

controller.save = async (req, res, next) => {
  // * Premisa - La ruta save debe de estar autenticada

  try {
    // const result = await uploadFile(req.file.path);
    // const pdfUrl = result.url;

    // fs.unlinkSync(req.file.path);

    const { title, materia, temas, clasificacion, annioPublicacion, cicloPublicacion, url } = req.body;
    const { identifier } = req.params;
    const { user } = req;

    // debug({ user });

    let document = await Document.findById(identifier);

    if (!document) {
      document = new Document();
      document["user"] = user._id; 
    } else {
      if (!document["user"].equals(user._id)) {
        return res.status(403).json({ error: "This is not your document" })
      }
    }

    document["title"] = title;
    document["materia"] = materia;
    document["temas"] = temas.split(", ");
    document["clasificacion"] = clasificacion;
    document["url"] = url;
    document["annioPublicacion"] = annioPublicacion;
    document["cicloPublicacion"] = cicloPublicacion; 

    const documentSaved = await document.save();
    
    if (!documentSaved) {
      // ! Conflicto
      return res.status(509).json({ error: "Error creating Document" })
    }
    
    return res.status(201).json(documentSaved);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

controller.findAll = async (req, res, next) => {
  try {
    const documents = 
      await Document.find({ hidden: false })
        .populate("user", "username email")
        .populate("likes", "username email");

    return res.status(200).json({ documents });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error controller" });
  }
}

controller.findOneById = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const document = 
      await Document.findOne({ _id: identifier, hidden: false})
        .populate("user", "username email")
        .populate("likes", "username email");;
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    return res.status(200).json(document);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.findOwn = async (req, res, next) => {
  try {
    const { _id: userId} = req.user;

    const documents = 
      await Document.find({ user: userId })
        .populate("user", "username email")
        .populate("likes", "username email");;
    
    return res.status(200).json({ documents })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.findSavedDocuments = async (req, res, next) => {
  try {
    const user = 
      await (req.user)
        .populate({
          path: "savedDocuments",
          populate: [
            {
              path: "user",
              select: "username email"
            },
            {
              path: "likes",
              select: "username email"
            }
          ]
        });

    return res.status(200).json({ documents: user["savedDocuments"] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.findByUser = async (req, res, next) => {
  try {
    const { identifier } = req.params
    
    const documents = 
      await Document.find({ user: identifier, hidden: false })
      .populate("user", "username email")
      .populate("likes", "username email");;
    
    return res.status(200).json({ documents })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.findByMateria = async (req, res, next) => {
  //BUsqueda
  try {
    const { materia } = req.query;

    const documents = 
      await Document.find({ hidden: false, materia: materia });

    return res.status(200).json({ documents });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.deleteById = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    // const user = req.user;

    const document = await Document.findOneAndDelete({ _id: identifier });

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    return res.status(200).json({ message: "Document Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.toggleHidden = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const user = req.user;

    // * Obtener el document
    // ? Verificar la pertenencia del post al usuario
    const document = 
      await Document.findOne({ _id: identifier, user: user._id })
        .populate("user", "username email")
        .populate("likes", "username email");
    
    // ! Si el documento no existe -> 404 
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // * Cambiamos el valor
    document.hidden = !document.hidden;

    // Comit a los cambios
    const newDocument = await document.save();

    return res.status(200).json(newDocument);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.likeADocument = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const user = req.user;

    // * Obtener el document
    // ? Verificar la pertenencia del post al usuario
    const document = 
      await Document.findOne({ _id: identifier, hidden: false })
        .populate("user", "username email");
    
    // ! Si el documento no existe -> 404 
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // * Dar like o dislike
    let _likes = document["likes"] || [];
    const alreadyLike = _likes.findIndex(_i => _i.equals(user._id)) >= 0; 

    if (alreadyLike) {
      _likes = _likes.filter(_i => !_i.equals(user._id) )
    } else {
      _likes = [user._id, ..._likes];
    }

    document["likes"] = _likes;

    // Comit a los cambios
    const newDocument = await (await document.save())
      .populate("likes", "username email");
    return res.status(200).json(newDocument);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

controller.saveADocument = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const user = req.user;

    // * Obtener el document
    // ? Verificar 
    const document = 
      await Document.findOne({ _id: identifier, hidden: false })
        .populate("user", "username email")
        .populate("likes", "username email");

    
    // ! Si el documento no existe -> 404 
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // * Dar save o delete from collection
    let _documents = user["savedDocuments"] || [];
    console.log(_documents);
    const alreadySaved = _documents.findIndex(_i => _i.equals(document._id)) >= 0;

    if (alreadySaved) {
      _documents = _documents.filter(_i => !_i.equals(document._id));
    } else {
      _documents = [document._id, ..._documents];
    }

    // Comit a los cambios
    user["savedDocuments"] = _documents;
    const newUser = 
      await (await user.save())
        .populate({
          path: "savedDocuments",
          populate: [
            {
              path: "user",
              select: "username email"
            },
            {
              path: "likes",
              select: "username email"
            }
          ]
        });


    return res.status(200).json({ document: newUser["savedDocuments"] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = controller;