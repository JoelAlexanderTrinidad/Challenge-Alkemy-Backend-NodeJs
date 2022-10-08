require('dotenv').config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.API_KEY);

const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
        console.log('Mensaje enviado correctamente!')
    } catch (error) {
        console.log(error)
    }
}

/* sendMail({
    to: 'kakusheemu@gmail.com',
    from: 'joelalexandertrinidad@gmail.com',
    subject: 'Holaaa!',
    text: 'Espero que funcione XD'
}) */

module.exports = sendMail;