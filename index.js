const sgMail = require('@sendgrid/mail');
const { exit } = require('process');
const fs = require('fs');
require('dotenv').config();

const templateEmail = fs.readFileSync('template.html').toString('utf-8');

sgMail.setApiKey(process.env.SENDGRID_KEY);

function sendEmail(to, personName, secretFriend) {

    const happyChristmasMessage = `${personName} o teu amigo/a secreto/a é ${secretFriend}!`;
    const readyToSendContent = templateEmail.replace('EMAIL_CONTENT', happyChristmasMessage);

    const msg = {
        to: to,
        from: 'joanaa-esteves@hotmail.com',
        subject: 'TOP SECRET - Amigos Secretos',
        text: happyChristmasMessage,
        html: readyToSendContent,
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}

// sendEmail('nuno.levezinho@live.com.pt', 'Nuno', 'Joana')

let pessoas = [{
    name: 'Sonia',
    email: 'ssequeiros23@gmail.com',
},
{
    name: 'Stela',
    email: 'stela.cuba@hotmail.com',
},
{
    name: 'Manuel',
    email: 'manuelsequeiros6@gmail.com',
},
{
    name: 'Barbara',
    email: 'barbaraacarvalhoo98@gmail.com',
},
{
    name: 'Soraia',
    email: 'soraia.es91@gmail.com',
},
{
    name: 'Pedro',
    email: 'pedrofontinha318@gmail.com',
},
{
    name: 'Celia',
    email: 'celiaestevesc@hotmail.com',
},
{
    name: 'Sergio',
    email: 'sergio.carvalho73@hotmail.com',
},
{
    name: 'Rodolfo',
    email: 'rodolfo.sequeiros6798@outlook.pt',
},
{
    name: 'Fernando',
    email: 'fjquinteiro@gmail.com',
},
{
    name: 'Avelina',
    email: 'avelina_esteves@gmail.com',
},
{
    name: 'Joao',
    email: 'stela.cuba@hotmail.com',
},
{
    name: 'Joana',
    email: 'joanaescar@hotmail.com',
}]

let amigos = [].concat(pessoas);

amigos.sort(function () {
    return 0.5 - Math.random()
});

for (let i = 0; i < pessoas.length; i++) {
    if (pessoas[i].name === amigos[i].name) {
        console.log('Colisao, saquem dos livrestes.')
        exit(-1);
    }
}

const writeStream = fs.createWriteStream("AmigoSecretos.txt");

for (let i = 0; i < pessoas.length; i++) {
    writeStream.write(`${pessoas[i].name} - ${amigos[i].name}\n`);
}

writeStream.end();

for (let i = 0; i < pessoas.length; i++) {
    sendEmail(pessoas[i].email, pessoas[i].name, amigos[i].name)
}