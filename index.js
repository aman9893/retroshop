
const express = require('express')
const routes = require('./router/router')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = '3011'
app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  app.use(cors());
  app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});
app.use('/', routes)

app.get('/test', (req,res) => res.send('Hello World'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
