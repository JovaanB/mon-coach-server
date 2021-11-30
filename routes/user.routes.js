const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/athlete",
    [authJwt.verifyToken, authJwt.isAthlete],
    controller.athleteBoard
  );

  app.get(
    "/api/test/master",
    [authJwt.verifyToken, authJwt.isMaster],
    controller.masterBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
