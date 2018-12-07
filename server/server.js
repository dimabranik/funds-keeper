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
  totalMoney: 25000, 
  totalInputCurMonth: 500,
  totalExpenseCurMonth: 300,
  accounts: {
    keep: [
      {
        name: 'cash', 
        balance: [
          {
            date: '10.18',
            balance: 10500
          },
          {
            date: '11.18',
            balance: 300
          },
          {
            date: '12.18',
            balance: 900
          },
        ]
      },
      {
        name: 'card', 
        balance: [
          {
            date: '10.18',
            balance: 200
          },
          {
            date: '11.18',
            balance: 100
          },
          {
            date: '12.18',
            balance: 500
          },
        ]
      },
    ],

    expense: [
      {
        name: 'travel', 
        dates: [
          {
            date: '10.18',
            balance: 200
          },
          {
            date: '11.18',
            balance: 100
          },
          {
            date: '12.18',
            balance: 500
          },
        ]
      },
      {
        name: 'food', 
        dates: [
          {
            date: '10.18',
            balance: 500
          },
          {
            date: '11.18',
            balance: 1000
          },
          {
            date: '12.18',
            balance: 200
          },
        ]
      },
    ],
  },
}

app.get('/api/userinfo', authCheck, (req,res) => {
  
  // check token, find user (or create), send back user-info 
  // const authorization = req.get('Authorization');

  console.log("/api/userinfo request");
  // console.log(req)

  res.json({
    username: user_data.nickname,
    totalMoney: user_data.totalMoney,
    totalInputCurMonth: user_data.totalInputCurMonth,
    totalExpenseCurMonth: user_data.totalExpenseCurMonth,
  });

});

app.get('/v1/accounts/keep', authCheck, (req,res) => {
  
  // check token, find user (or create), send back user-info 
  // const authorization = req.get('Authorization');

  console.log("/v1/accounts/keep");
  // console.log(req)

  res.json(user_data.accounts.keep);

});

app.get('/v1/accounts/expense', authCheck, (req,res) => {
  
  // check token, find user (or create), send back user-info 
  // const authorization = req.get('Authorization');

  console.log("/v1/accounts/expense request");
  // console.log(req)

  res.json(user_data.accounts.expense);

});


app.post('/v1/income', authCheck, (req,res) => {
  
  // check token, find user (or create), send back user-info 
  // const authorization = req.get('Authorization');

  console.log("/v1/income request");
  // console.log(req)


  curMonth = '12.18'
  
  user_data.accounts.keep.forEach(element => {
    if (element.name === req.account_name) {
      element.dates.forEach(month_element => {
        if (month_element.date === curMonth) {
          month_element.balance += req.amount;
          break;
        }
      });
      break;
    }
  });
  
  user_data.totalInputCurMonth += req.amount;

  res.json(201);
  
});

app.listen(3333);
console.log('Listening on localhost:3333');
