const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../../models/Contact');

router.get('/test', (req, res) => res.send('contact route testing!'));

const serviceGmailUser = process.env.SERVICE_GMAIL_EMAIL;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const googleAccessToken = process.env.GOOGLE_ACCESS_TOKEN;
const personalGmailUser = process.env.PERSONAL_GMAIL_EMAIL;

let mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: serviceGmailUser,
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        refreshToken: googleRefreshToken,
        accessToken: googleAccessToken
    },
});

router.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: personalGmailUser,
        subject: `New message from ${name} <${email}> via personal portfolio`,
        text: message
    };

    mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Sent Successfully');
        }
    });
});

router.post('/upload-contact', (req, res) => {
    Contact.create(req.body)
        .then(contact => res.json({ contact: contact, msg: 'Contact added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this contact' }));
});

module.exports = router;