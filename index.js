require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

const { PORT, ORIGIN, MONGODB_URI } = process.env;
const port = PORT || 8080;

const Role = db.role;

const corsOptions = {
  origin: ORIGIN,
};

app.use(cors(corsOptions));
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token,Content-Type,x-requested-with,Authorization, Accept, Origin"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.text({ type: "text/*" }));

const dbPath = MONGODB_URI;
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
        name: "athlete",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'athlete' to roles collection");
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
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(port, () => {
  console.log("Running on port " + port);
});
