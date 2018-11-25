'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://secure-auth0.eu.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: 'http://fundskeeper.com',
    issuer: "https://secure-auth0.eu.auth0.com/",
    algorithms: ['RS256']
});

app.get('/api/userid', authCheck, (req,res) => {
  
  const authorization = req.get('Authorization');

  // get from db user id with such token
  const userid = 155

  res.json({userid: userid});
})

app.listen(3333);
console.log('Listening on localhost:3333');
