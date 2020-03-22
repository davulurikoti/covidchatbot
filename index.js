const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const axios = require('axios');


const client = require('twilio')(process.env.SID, process.env.AUTH);



const https = require("https");
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const session = require('express-session');

const worldurl = "https://corona.lmao.ninja/all";
const countryurl = "https://corona.lmao.ninja/countries";

let mainMenu = '1. World report \n 2. My country report \n 3. Country wise report \n 4. Top 5 countries report \n 5. Corona \n 6. About and Help';
let coronaMenu = '1. What is Coronavirus and what are its symptoms? \n 2. How does Coronavirus spread? \n 3. How to reduce the risk of Coronavirus? \n 4. Professional Advice By AIIMS-Director \n 5. Know more on Coronavirus';
let errorMessage = 'Sorry!! I did\'n\'t understand';

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get("/url", (req, res, next) => {
	https.get(worldurl, rs => {
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


app.use(session({secret: 'anything-you-want-but-keep-secret'}));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  const currentmsg = req.session.current || 0;

  let message = '';
  if(currentmsg == 0){
  	https.get(worldurl, rs => {
  	rs.setEncoding("utf8");
  	let body = "";
  	rs.on("data", data => {
    body += data;
    message = 'Hello there! Currently the world has '+JSON.parse(body).cases+' COVID cases reported.\n';
    message = message + mainMenu;
  	twiml.message(message);

  	res.writeHead(200, {'Content-Type': 'text/xml'});
 	res.end(twiml.toString());
      });});
  
    req.session.current = 1;
  }
  else if(currentmsg == 1){
  	
 	if(req.body.Body == 1){
 		req.session.current = 1;
 		https.get(worldurl, rs => {
  		rs.setEncoding("utf8");
  		let body = "";
  		rs.on("data", data => {
    	body += data;
    	message = 'Here is the World report.\n';
    	message = message+'Total cases:'+JSON.parse(body).cases+' \n Total deaths:'+JSON.parse(body).deaths+'\n Total recovered:'+JSON.parse(body).recovered;
  		twiml.message(message);

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());
      });});
 	}
 	else if(req.body.Body == 2){
 		req.session.current = 1;
 		twiml.message("This feature is under development. Coming soon...\n Select from main menu again. \n"+mainMenu);

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());
 	}
 	else if(req.body.Body == 3){
 		req.session.current = 10;
 		message = 'Please enter the country name';
 		twiml.message(message);

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());
 	}
 	else if(req.body.Body == 4){
 		if(req.body.Body == 0){
  		https.get(worldurl, rs => {
  	rs.setEncoding("utf8");
  	let body = "";
  	rs.on("data", data => {
    body += data;
    message = 'Hello there! Currently the world has '+JSON.parse(body).cases+' COVID cases reported.\n';
    message = message + mainMenu;
  	twiml.message(message);

  	res.writeHead(200, {'Content-Type': 'text/xml'});
 	res.end(twiml.toString());
      });});
  
    req.session.current = 1;
  	}
  	else{
  		axios.get(countryurl)
  			.then(response => {
    
    		for (var i = 0; i < 5; i++) {
    			let curr = '**'+response.data[i].country+'\n Cases:'+response.data[i].cases+'\n today cases:'+response.data[i].todayCases+'\n deaths:'+response.data[i].deaths+'\n today deaths'+response.data[i].todayDeaths+'\n';
    			message = message + curr;
    		}
    		message = message+'\n-----------\n 0 to go to main menu'
    		twiml.message(message);

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());
  		})
  		.catch(error => {
    	console.log(error);
  		});
  	}
 		
 	}
 	else if(req.body.Body == 5){
 		req.session.current = 1;
 		twiml.message("This feature is under development. Coming soon...\n Select from main menu again. \n"+mainMenu);

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());
 	}
 	else if(req.body.Body == 6){
 		req.session.current = 1;
 		twiml.message("You can ping me 'https://wa.me/918220432496'for any queries.\n Select from main menu again. \n"+mainMenu);

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());
 	}
 	else{
 		req.session.current = 1;
 		message = errorMessage+'\n'+mainMenu;
  		twiml.message(message);

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());
 	}
    
  }
  else if(currentmsg == 10){
  	if(req.body.Body == 0){
  		https.get(worldurl, rs => {
  	rs.setEncoding("utf8");
  	let body = "";
  	rs.on("data", data => {
    body += data;
    message = 'Hello there! Currently the world has '+JSON.parse(body).cases+' COVID cases reported.\n';
    message = message + mainMenu;
  	twiml.message(message);

  	res.writeHead(200, {'Content-Type': 'text/xml'});
 	res.end(twiml.toString());
      });});
  
    req.session.current = 1;
  	}
  	else{
  		axios.get('https://corona.lmao.ninja/countries/'+req.body.Body)
  	.then(response => {
    
    	message = response.data.country+'\n -------------------\n Cases:'+response.data.cases+'\n Today cases:'+response.data.todayCases+'\n Deaths:'+response.data.deaths+'\n Today deaths:'+response.data.todayDeaths+'\n Recovered: '+response.data.recovered+'\n Active:'+response.data.active+'\n Critical:'+response.data.critical+'\n Cases per million:'+response.data.casesPerOneMillion;
    	message = message+'\n-----------\n You can enter another country \n-----------\n 0 to go to main menu'
    	twiml.message(message);

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());	
   
  })
  .catch(error => {
  	twiml.message("Invalid country name");

  		res.writeHead(200, {'Content-Type': 'text/xml'});
 		res.end(twiml.toString());
    console.log(error);
  });
  	}
  	
  }
 

 
});


