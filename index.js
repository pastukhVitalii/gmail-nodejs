const express = require('express');
const nodemailer = require("nodemailer");
const app = express()
const port = 3010

/*фронтенд не може відправляти листи !! Він може зробити запит на сервер а той в свою чергу
робить запит на інший поштовий сервер (джмейл).Запити з сервера на сервер робляться за допомогою nodemailer*/

// pop3 відає листи
// SMTP  відправка на сервер
// create reusable transporter object using the default SMTP transport
// async function main() {
let transporter = nodemailer.createTransport({

    service: 'gmail',
    /*host: "",
    port: 25, //587,
    secure: false, // true for 465, false for other ports
    tls: {
        
        // --unhandledrejection=strict
    },*/
    auth: {
        user: , // generated ethereal user
        pass: , // generated ethereal password
    },
});

// базовий URL
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/sendMessage', async (req, res) => {

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Vitaliy', // sender address
        to: 'pastukh.v.7@gmail.com', // list of receivers
        subject: "testing gmail", // Subject line
       // text: "Hello world? (text)", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    res.send('Hello World again!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})