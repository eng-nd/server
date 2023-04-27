const { UserList } = require("./db/connection");
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JSON_SECRET);
}

app.post("/user/generateToken", (req, res) => {
  const token = generateAccessToken(req.body);
  const a = jwt.verify(token, process.env.JSON_SECRET);
  console.log(a);
  res.status(200).send({ token });
});

app.get("/csurf", (req, res) => {});
app.post("/login", (req, res) => {
  const user = {
    name: "Shubham",
    password: "sfd",
    sheets: [
      {
        id: 1,
        name: "FMS",
        link: "/ht",
      },
      {},
    ],
  };

  const username = "shubham@chairplasticparts.co.in";
  const password = "test@123";

  if (username !== req.data.email || password !== req.data.password) {
    res.status(401).json({
      status: 401,
      message: "Invalid Credentials",
    });
  }
  res.status(200).json({
    status: 200,
    message: "OK! Received",
    isAuthenticated: true,
    data: {
      user,
    },
  });
});

app.post("/reset", (req, res) => {
  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      sender: {
        email: "shubham2403tayal@gmail.com",
        name: "Shubham Aggarwal",
      },
      subject: "Testing sendinblue email server",
      htmlContent:
        "<!DOCTYPE html><html><body><h1>Welcome! Login is successfull</h1><p>My first paragraph.</p></body></html>",
      params: {
        greeting: "This is the default greeting",
        headline: "This is the default headline",
      },
      messageVersions: [
        //Definition for Message Version 1
        {
          to: [
            {
              email: "shubhx24@gmail.com",
              name: "Shubham Aggarwal",
            },
          ],
          htmlContent:
            "<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>",
          subject: "We are happy to be working with you",
        },

        // Definition for Message Version 2
      ],
    })
    .then((data) => {
      res.status(200).json({
        status: "Email Triggered",
        message: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "Unexpected failure occurred",
        message: err.message,
      });
    });
});

app.post("/resetPassword", (req, res) => {
  console.log(req.body.data.email);
  try {
    userEmail = req.body.data.email;

    UserList.findOne({ email: userEmail })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            status: "Failure",
            message: "So such account exists with this email",
          });
        }

        if (!user.isEnabled) {
          res.status(401).json({
            status: "Failure",
            message: "Access for the user is denied",
          });
        }

        /* Send Email with reset option */

        new SibApiV3Sdk.TransactionalEmailsApi()
          .sendTransacEmail({
            sender: {
              email: "shubham2403tayal@gmail.com",
              name: "Shubham Aggarwal",
            },
            subject: "Testing sendinblue email server",
            htmlContent:
              "<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
            params: {
              greeting: "This is the default greeting",
              headline: "This is the default headline",
            },
            messageVersions: [
              {
                to: [
                  {
                    email: "shubhx24@gmail.com",
                    name: "Shubham Aggarwal",
                  },
                ],
                htmlContent: `<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>",
                  subject: "We are happy to be working with you ${req.body.data.email}`,
              },
            ],
          })
          .then((data) => {
            res.status(200).json({
              status: "Email Triggered",
              message: data,
            });
          })
          .catch((err) => {
            res.status(503).json({
              status: "Unexpected failure occurred",
              message: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          status: "Unexpected failure occurred",
          message: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      status: "Unexpected failure occurred",
      message: err.message,
    });
  }
});

// UserList Modal
// User Modal
// Document Modal
// Video Modal
// Department Modal
