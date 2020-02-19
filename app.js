const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const user = {
  profileimgUrl: "https://i.imgur.com/PzWBXxZ.png",
  firstName: "Sally",
  lastName: "Sue",
  accountId: "420123"
};

const shareUser = {
  profileimgUrl: "https://i.imgur.com/tEP338V.png",
  firstName: "Bobby",
  lastName: "Bob",
  accountId: "123420"
};

app.post("/api/login/", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);

  if (req.body.email === "sally@gmail.com" && req.body.password === "sally") {
    res.status(200).json({
      account: user
    });
  } else if (req.body.email === undefined || req.body.password === undefined) {
    res
      .status(422)
      .json({ error: { message: "Email and password required!" } });
  } else {
    res.status(422).json({ error: { message: "Wrong email or password!" } });
  }
});

app.get("/api/account/:accountId/documents/", (req, res) => {
  if (req.params.accountId === user.accountId) {
    res.status(200).json({
      documents: [
        {
          type: "Driver's License",
          url: "https://i.imgur.com/DckggQC.png",
          sharedWith: [shareUser]
        },
        {
          type: "Passport",
          url: "https://i.imgur.com/rENTlwc.png",
          sharedWith: []
        },
        {
          type: "Birth Certificate",
          url: "https://i.imgur.com/6OsFLjf.png",
          sharedWith: []
        }
      ]
    });
  } else {
    res.status(422).json({ error: { message: "User does not exist!" } });
  }
});

app.get("/api/documenttypes/", (req, res) => {
  res.status(200).json({
    documentTypes: [
      "Driver's License",
      "Birth Certificate",
      "MAP Card",
      "Medical Records",
      "Social Security Card",
      "Passport",
      "Marriage Certificate"
    ]
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
