const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const services = require("../services");
const Invitation = db.invitation;
const Athlete = db.athlete;
const User = db.user;
const Role = db.role;

exports.sendInvitation = (req, res) => {
  const token = jwt.sign(
    { email: req.body.email, user: req.body.user },
    process.env.AUTH_KEY,
    {
      expiresIn: 86400,
    }
  );

  const invitation = new Invitation({
    email: req.body.email,
    userID: req.body.user.id,
    token,
    active: true,
  });

  invitation.save((err, invitation) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    const { firstname, lastname } = req.body.user;

    const messageToSend = `Bonjour 👋 

  ${firstname} ${lastname} vous invite à rejoindre l'application Mon Coach 🏋️ !
  Accédez dès à présent à l'application web, vous pourrez compléter votre profil en vue d'une séance avec votre coach. 

  Pour vous connecter, suivez ce lien http://localhost:3000/join?token=${token} et utilisez cet email :
  ${req.body.email}

  A bientôt sur l'application Mon Coach 😀
  `;

    const messageHtml = `<p>Bonjour 👋</p>
  <b>${firstname} ${lastname}</b> vous invite à rejoindre l'application Mon Coach 🏋️ !<br />
  Accédez dès à présent à l'application web, vous pourrez compléter votre profil en vue d'une séance avec votre coach.<br />
  <br />
  Pour vous connecter, suivez ce lien <a href="http://localhost:3000/join?token=${token}" rel="noreferrer" target="_blank">Mon Coach</a> et utilisez cet email :<br />
 ${req.body.email}<br />
  <br />
  A bientôt sur l'application Mon Coach 😀
  `;

    services.sendMail({
      to: req.body.email,
      subject: "Invitation à rejoindre MonCoach",
      text: messageToSend,
      html: messageHtml,
    });
    res.send({ message: `Nouvelle invitation enregistrée. ${invitation}` });
  });
};

exports.joinInvitation = (req, res) => {
  Invitation.findOne({ token: req.token }, (err, invitation) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (invitation.active) {
      const user = new User({
        email: req.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: bcrypt.hashSync(req.body.password, 8),
        userID: req.user._id,
      });

      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        Role.findOne({ name: "athlete" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            const athlete = new Athlete({
              userID: user._id,
            });

            athlete.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({ message: "Nouvel athlete enregistré." });
            });
          });
        });
      });
    } else {
      res.send({
        message:
          "Vous n'avez pas l'autorisation ou votre invitation n'est plus valide.",
      });
    }
  });
};

exports.verify = (req, res) => {
  let token = req.body.token;

  if (!token) {
    return res.status(403).send({ message: "Pas de token." });
  }

  jwt.verify(token, process.env.AUTH_KEY, (err) => {
    if (err) {
      return res.status(401).send({ message: "Non authorisé." });
    }

    res.send({ isVerify: true });
  });
};
