const jwt = require("jsonwebtoken");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email ?? req.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res
        .status(400)
        .send({ message: "Cette adresse email est déjà utilisé." });
      return;
    }

    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (ROLES.includes(req.body.roles[i])) {
        res.status(400).send({ message: "Ce rôle n'existe pas." });
        return;
      }
    }
  }

  next();
};

const verifyToken = (req, res, next) => {
  let token = req.query.token;

  if (!token) {
    return res.status(403).send({ message: "Pas de token." });
  }

  jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non authorisé." });
    }

    req.token = token;
    req.email = decoded.email;
    req.user = decoded.user;

    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted,
  verifyToken,
};

module.exports = verifySignUp;
