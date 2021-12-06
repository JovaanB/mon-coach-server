const { authJwt } = require("../middlewares");
const controller = require("../controllers/invitation.controller");

module.exports = (app) => {
  app.post(
    "/api/auth/invite",
    [authJwt.verifyToken],
    controller.sendInvitation
  );
};
