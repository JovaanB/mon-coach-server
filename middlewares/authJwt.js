const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const Role = db.Role;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Pas de token." });
  }

  jwt.verify(token, process.env.AUTH_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Non authorisé." });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Besoin du rôle admin." });
        return;
      }
    );
  });
};

const isMaster = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "master") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Besoin du rôle master" });
        return;
      }
    );
  });
};

const isCoach = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "coach") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Besoin du rôle coach" });
        return;
      }
    );
  });
};

const isAthlete = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "athlete") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Besoin du rôle athlete" });
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isMaster,
  isAdmin,
  isCoach,
  isAthlete,
};

module.exports = authJwt;
