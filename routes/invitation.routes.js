const { authJwt, verifySignUp } = require("../middlewares");
const controller = require("../controllers/invitation.controller");

module.exports = (app) => {
  app.post("/api/auth/verify", controller.verify);

  app.post(
    "/api/auth/invite",
    [authJwt.verifyToken],
    controller.sendInvitation
  );

  app.post(
    "/api/auth/join",
    [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted,
      verifySignUp.verifyToken,
    ],
    controller.joinInvitation
  );
};
