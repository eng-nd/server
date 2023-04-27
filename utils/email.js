var SibApiV3Sdk = require("sib-api-v3-sdk");
const AppError = require("./appError");

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.EMAIL_SENDER_API_KEY;

module.exports = class Email {
  constructor(name, url, message, subject) {
    this.to = process.env.EMAIL_TO;
    this.toName = name;
    this.from = process.env.EMAIL_FROM;
    this.url = url;
    this.message = message;
    this.subject = subject;
  }

  async sendEmail() {
    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        sender: {
          email: this.from,
          name: "Shubham Aggarwal",
        },
        subject: this.subject,
        htmlContent:
          "<!DOCTYPE html><html><body><h1>ND Chairs</h1><p>ND Chairs</p></body></html>",
        params: {
          greeting: "Thank you! for being part of nd",
          headline: "ND Chairs Internal Server",
        },
        messageVersions: [
          {
            to: [
              {
                email: this.to,
                name: this.toName,
              },
            ],
            htmlContent: `<!DOCTYPE html><html><body><h1>Hey! Human</h1><h2>${this.message}</h2><p>The url for following operation is ${this.url}</p></body></html>`,
            subject: this.subject,
          },
        ],
      })
      .then((data) => {
        console.log("Ok");
      })
      .catch((err) => {
        return new AppError(`Internal Server Error with ${err}`, 501);
      });
  }
};

// this.to = email;
// this.toName = name;
// this.from = process.env.EMAIL_FROM;
// this.url = url;
// this.message = message;
// this.subject = subject;
// }
