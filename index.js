const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const accountSid = 'ACe813da4d5c69162117755494bf5f7d22';
const authToken = '9bce519bec863ea3b55b77fd4dd8af11';
const client = require('twilio')(accountSid, authToken);


var app = express();/*
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/
const https = require("https");
const url = "https://corona.lmao.ninja/all";

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
console.log('todo list RESTful API server started on: ' + PORT);

app.get("/url", (req, res, next) => {
	https.get(url, rs => {
  rs.setEncoding("utf8");
  let body = "";
  rs.on("data", data => {
    body += data;
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: JSON.parse(body),
         to: 'whatsapp:+5213321302239'
       })
      .then(message => console.log(message.sid));
    res.json(JSON.parse(body));
  });
});
});



