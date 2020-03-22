const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const axios = require('axios');


const worldurl = "https://corona.lmao.ninja/all";
const countryurl = "https://corona.lmao.ninja/countries";



var app = express();


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
/*{"country":"Italy","cases":53578,"todayCases":6557,"deaths":4825,"todayDeaths":793,"recovered":6072,"active":42681,"critical":2857,"casesPerOneMillion":886}*/
let message = '';
app.get("/url", (req, res) => {
	axios.get('https://corona.lmao.ninja/countries')
  .then(response => {
    
    for (var i = 0; i < response.data.length; i++) {
    	let curr = response.data[i].country+'\n -------------------\n Cases:'+response.data[i].cases+'\n today cases:'+response.data[i].todayCases+'\n deaths:'+response.data[i].deaths+'\n today deaths'+response.data[i].todayDeaths+'\n';
    	message = message + curr;
    }
    res.send(message);
  })
  .catch(error => {
    console.log(error);
  });
});

app.get("/url/:country", (req, res) => {
	console.log(req.params.country);
	axios.get('https://corona.lmao.ninja/countries/'+req.params.country)
  .then(response => {
    
    	let curr = response.data.country+'\n -------------------\n Cases:'+response.data.cases+'\n Today cases:'+response.data.todayCases+'\n Deaths:'+response.data.deaths+'\n Today deaths:'+response.data.todayDeaths+'\n Recovered: '+response.data.recovered+'\n Active:'+response.data.active+'\n Critical:'+response.data.critical+'\n Cases per million:'+response.data.casesPerOneMillion;
    	
    res.send(curr);
  })
  .catch(error => {
    console.log(error);
  });
});









