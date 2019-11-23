'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = "ict2x01@gmail.com";
const gmailPassword = "ICT2x01!";
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});


exports.sendEmailConfirmation = functions.database.ref('/user/{uid}').onWrite(async (change) => {


  const mailOptions = {
    from: '"Pathfinder Admin" <noreply@firebase.com>',
    to: "idris0127@gmail.com",
  };

  // Building Email message.
  mailOptions.subject = "Welcome to PathFinder!";
  mailOptions.text = "Thank you for registering with PathFinder. We hope you will enjoy the application.";
  
  try {
    mailTransport.sendMail(mailOptions);
    console.log(`New email sent out`);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;
});
