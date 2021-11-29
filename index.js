const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./config/db.config");
const cors = require("cors");
const apiRoutes = require("./routes");
const db = require("./models");
const app = express();
const port = process.env.PORT || 8080;

const Role = db.role;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbPath = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
db.mongoose
  .connect(dbPath, options)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "coach",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'coach' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "master",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'master' to roles collection");
      });
    }
  });
};

app.get("/", (req, res) => res.send("Welcome to server - Mon Coach"));
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log("Running on port " + port);
});
