const jwt = require("jsonwebtoken");
const db = require("../models");
const services = require("../services");
const Invitation = db.invitation;

exports.sendInvitation = (req, res) => {
  const token = jwt.sign({ email: req.body.email }, process.env.AUTH_KEY, {
    expiresIn: 86400,
  });

  const invitation = new Invitation({
    email: req.body.email,
    userID: req.body.user._id,
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

  ${firstname} ${lastname} vous invite à rejoindre l'application MonCoach 🏋️ !
  Accédez dès à présent à l'application web, vous pourrez compléter votre profil en vue d'une séance avec votre coach. 

  Pour vous connecter, suivez ce lien https://moncoach.com et utilisez cet email :
  ${req.body.email}

  A bientôt sur l'application MonCoach 😀
  `;

    const messageHtml = `<p>Bonjour 👋</p>
  <b>${firstname} ${lastname}</b> vous invite à rejoindre l'application MonCoach 🏋️ !<br />
  Accédez dès à présent à l'application web, vous pourrez compléter votre profil en vue d'une séance avec votre coach.<br />
  <br />
  Pour vous connecter, suivez ce lien <b>https://moncoach.com</b> et utilisez cet email :<br />
 ${req.body.email}<br />
  <br />
  A bientôt sur l'application MonCoach 😀
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
