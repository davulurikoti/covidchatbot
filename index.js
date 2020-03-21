const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
const https = require("https");
const url = "https://corona.lmao.ninja/all";

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

app.get("/url", (req, res, next) => {
	https.get(url, rs => {
  rs.setEncoding("utf8");
  let body = "";
  rs.on("data", data => {
    body += data;
    res.json(JSON.parse(body));
  });
});
});



