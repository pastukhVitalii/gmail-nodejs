const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// const port = 3010;

let port = process.env.PORT || 3000;

/*фронтенд не може відправляти листи !! Він може зробити запит на сервер а той в свою чергу
робить запит на інший поштовий сервер (джмейл).Запити з сервера на сервер робляться за допомогою nodemailer*/

// pop3 відає листи
// SMTP  відправка на сервер
// create reusable transporter object using the default SMTP transport
// async function main() {

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";
let transporter = nodemailer.createTransport({

    service: 'gmail',
    /*host: "",
    port: 25, //587,
    secure: false, // true for 465, false for other ports
    tls: {

        // --unhandledrejection=strict
    },*/
    auth: {
        type: "login",
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

// базовий URL
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/sendMessage',async (req, res) => {

    let {name, email, message} = req.body;
    // send mail with defined transport object
    let info =  await transporter.sendMail({
        from: 'Vitaliy', // sender address
        to: 'pastukh.v.7@gmail.com', // list of receivers
        subject: "testing gmail", // Subject line
        // text: "Hello world? (text)", // plain text body
        html: `<b>Messages </b>
        <div>
            name: ${name}
        </div>
        <div>
            email: ${email}
        </div>
        <div>
            message: ${message}
        </div>`
    });

    // res.send('Hello World again!')
    res.send('ok');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

process.on('unhandledRejection', (reason, p) => {
    console.log('!!! UnhandledRejection: ', reason, p) // need log always
})


/*
const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        type: "login",
        user: process.env.GMAIL_USER || GMAIL_USER,
        pass: process.env.GMAIL_PASS || GMAIL_PASS
    }
});

export const sendMail = async (from: string, to: string, subject: string, html?: string, text?: string) => {

    // for accept
    // https://myaccount.google.com/lesssecureapps
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html: text ? undefined : html,
    });

    if (DEV_VERSION) console.log("gmail info: ", info);

    return info;
};
*/
