'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = 'ict2x01@gmail.com';
const gmailPassword = 'ICT2x01!';
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   user: gmailEmail,
    pass: gmailPassword,
  },
});


exports.firestoreEmail = functions.auth.user().onCreate((user) => {

const userEmail = user.email; // The email of the user.
                    
const mailOptions = {
    from: '"PathFinder Admin" <noreply@firebase.com>',
    to: userEmail,
  };



 mailOptions.subject = 'Welcome to PathFinder!';
  mailOptions.text = 'Welcome to Pathfinder! ';
 mailOptions.html = "<b>Thanks for registering with PathFinder! </b><br> <p> You can now start using the application. </p><p> If you have any issues logging in or using the app, please feel free to email us at admin@pathfinder.com</p> <p>We hope you will enjoy using our application. Have fun and start earning rewards! :) </p> <img src=\"https://www.lta.gov.sg/content/ltagov/en/getting_around/active_mobility/walking_cycling_infrastructure/_jcr_content/par/textimage_1965400261/image.img.jpg/1567025415122.jpg\" > "; 
  
  try {
     mailTransport.sendMail(mailOptions);
    console.log('New email sent');
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;
});
