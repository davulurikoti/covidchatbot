const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const accountSid = 'bd400c6c377619b68';
const authToken = 'd46c8006ad2f8792e';
const client = require('twilio')('AC7f0e8b304e79783'+accountSid, authToken+'7482dd7e84c1f6e');



const https = require("https");
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const session = require('express-session');
const url = "https://corona.lmao.ninja/all";

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get("/url", (req, res, next) => {
	https.get(url, rs => {
  rs.setEncoding("utf8");
  let body = "";
  rs.on("data", data => {
    body += data;
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: ''+JSON.parse(body).cases+'',
         to: 'whatsapp:+5213321302239'
       })
      .then(message => console.log(message.sid));
    res.json(JSON.parse(body).cases);
  });
});
});


app.get("/", function(req, res) {
client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hello from koti! \n Your verification code is',
         to: 'whatsapp:+5213321302239'
       })
      .then(message => console.log(message.sid));
	res.end();
});

app.use(session({secret: 'anything-you-want-but-keep-secret'}));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const currentmsg = req.session.current || 0;

  let message = '';
  if(currentmsg == 0){
  	https.get(url, rs => {
  	rs.setEncoding("utf8");
  	let body = "";
  	rs.on("data", data => {
    body += data;
    message = 'Hello there! Currently the world has '+JSON.parse(body).cases+' cases reported.';
  	twiml.message(message);

  	res.writeHead(200, {'Content-Type': 'text/xml'});
 	res.end(twiml.toString());
      });});
  
    req.session.current = 1;
  }
  else if(currentmsg == 1){
    req.session.current = 0;
    if(req.body.Body == 1){
      message = 'Please select a window. \n 1. 10:00 - 11:00 \n 2. 11:00 - 12:00 \n 3. 14:00 - 15:00';
      req.session.current = 2;
    }
    else if(req.body.Body == 2){
      message = 'We currently support following documents. \n 1. Current month statement \n 2. Current year insurance \n 3. Home Loan document \n 4. bye';
      req.session.current = 3;
    }
    else if(req.body.Body == 3){
      message = 'I am your banking assistance. I can help you with sending documents, scheduling the call, etc.';
    }
    else if(req.body.Body == 4){
      message = 'Bye. Have a nice day!';
    }
    else{
      message = 'Wrong selection.Please select an option. \n 1. Request a call back \n 2. Get my documents \n 3. know about me \n 4. bye';
      req.session.current = 1;
    }
    
  }
  else if(currentmsg == 2){
    let docRef = db.collection("appointments").doc((req.body.From).split(":")[1]);
    req.session.current = 0;
    if(req.body.Body == 1){
      message = 'Your appointment is confirmed at 10:15. We will call you back. Have a nice day';
    }
    if(req.body.Body == 2){
      message = 'Your appointment is confirmed at 11:15. We will call you back. Have a nice day';
    }
    if(req.body.Body == 3){
      message = 'Your appointment is confirmed at 14:30. We will call you back. Have a nice day';
    }
     docRef.set({
          message: message,
          date: today,
          fulfilled: false
      });
  }
  else if(currentmsg == 3){
    req.session.current = 0;
    if(req.body.Body == 1){
      message = 'Here is your statement';
    }
    if(req.body.Body == 2){
      message = 'Here is your insurance document';
    }
    if(req.body.Body == 3){
      message = 'Here is your Home loan document';
    }
    if(req.body.Body == 4){
      message = 'Bye. Have a nice day!';
    }
  }
 

 
});


