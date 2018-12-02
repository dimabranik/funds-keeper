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

var user_data = {
  nickname: 'IvanIvanov', 
  accounts: {
    totalMoney: 25000, 
    income: {
      curMonth: 1555,
    }, 
    expenses: {
      curMonth: 200,
    },
  }
}

app.get('/api/userinfo', authCheck, (req,res) => {
  
  // check token, find user (or create), send back user-info 
  // const authorization = req.get('Authorization');

  console.log("/api/userinfo request");
  // console.log(req)

  res.json(user_data);

});

app.post('/api/addIncome', authCheck, (req,res) => {
  
  // check token, find user (or create), send back user-info 
  // const authorization = req.get('Authorization');

  console.log("/api/addIncome request");
  // console.log(req)

  user_data.accounts.income.curMonth += req.incomeToAdd;

  res.json(200);
  
});

app.listen(3333);
console.log('Listening on localhost:3333');
