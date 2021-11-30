exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.masterBoard = (req, res) => {
  res.status(200).send("Master Content.");
};

exports.athleteBoard = (req, res) => {
  res.status(200).send("Athlete Content.");
};
