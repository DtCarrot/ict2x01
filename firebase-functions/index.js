
const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
const cors = require("cors")({
  origin: true
});

exports.emailMessage = functions.https.onRequest((req, res) => {
  
  return cors(req, res, () => {
    var text = `<div>
      <h4>Thank you for registering with PathFinder.</h4>
      <p>To get started, login into the PathFinder app.</p>
      
    </div>`;
    const msg = {
      to: "idris0127@gmail.com",
      from: "admin@pathfinder.com",
      subject: `Thank you for registering PathFinder`,
      text: text,
      html: text
    };
    sgMail.setApiKey(
      "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"
    );
    sgMail.send(msg);
    res.status(200).send("success");
  })
});




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
