const { authJwt, verifySignUp } = require("../middlewares");
const controller = require("../controllers/invitation.controller");

module.exports = (app) => {
  app.get("/api/auth/getInvitation", controller.getInvitation);

  app.post(
    "/api/auth/invite",
    [authJwt.verifyToken],
    controller.sendInvitation
  );

  app.post(
    "/api/auth/join",
    [
      verifySignUp.verifyToken,
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.joinInvitation
  );
};
