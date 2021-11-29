let router = require("express").Router(); //set default API response

router.get("/", (req, res) => {
  res.json({
    status: "API Works",
    message: "Welcome to server - Mon Coach",
  });
});

module.exports = router;
