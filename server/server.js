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

let user_data = {
  nickname: 'IvanIvanov', 
  totalMoney: 10000, 
  totalIncomeCurMonth: 1400,
  totalExpenseCurMonth: 700,
  accounts: {
    keep: [
      {
        name: 'cash', 
        curMoney: 9200,
        dates: [
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
        curMoney: 800,
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
    nickname: user_data.nickname,
    totalMoney: user_data.totalMoney,
    totalIncomeCurMonth: user_data.totalIncomeCurMonth,
    totalExpenseCurMonth: user_data.totalExpenseCurMonth,
  });

});

app.get('/v1/accounts/keep', authCheck, (req,res) => {
  console.log("/v1/accounts/keep request");
  // console.log(req)

  res.json(user_data.accounts.keep);
});

app.get('/v1/accounts/expense', authCheck, (req,res) => {
  console.log("/v1/accounts/expense request");
  // console.log(req)

  res.json(user_data.accounts.expense);
});



app.post('/v1/income', (req,res) => {
  console.log("/v1/income request");
  console.log("req.body.data: " + req.body.data)

  let curMonth = '12.18'

  for (let index in user_data.accounts.keep) {
    if (user_data.accounts.keep[index].name === req.body.data.account_name) {
     
      for (let dates_index in user_data.accounts.keep[index].dates) {
       
        if (user_data.accounts.keep[index].dates[dates_index].date === curMonth) {
         
          user_data.accounts.keep[index].dates[dates_index].balance += parseInt(req.body.data.amount);
          user_data.accounts.keep[index].curMoney += parseInt(req.body.data.amount);
          user_data.totalIncomeCurMonth += parseInt(req.body.data.amount);
          user_data.totalMoney += parseInt(req.body.data.amount);
          break;
        }
      }
      break;
    }
  }

  res.json(201);
  
});

app.post('/v1/expense', (req,res) => {
  console.log("/v1/expense request");
  console.log("req.body.data: " + req.body.data)

  let curMonth = '12.18'
  
  for (let expense_account_index in user_data.accounts.expense) {
    if (user_data.accounts.expense[expense_account_index].name === req.body.data.expense_account_name) {
      for (let dates_index in user_data.accounts.expense[expense_account_index].dates) {
        if (user_data.accounts.expense[expense_account_index].dates[dates_index].date === curMonth) {
          user_data.accounts.expense[expense_account_index].dates[dates_index].balance += parseInt(req.body.data.amount);
          user_data.totalExpenseCurMonth += parseInt(req.body.data.amount);
          break;
        }
      } 
      break;
    }
  }

  for (let keep_account_index in user_data.accounts.keep) {
    if (user_data.accounts.keep[keep_account_index].name === req.body.data.keep_account_name) {
      for (let dates_index in user_data.accounts.keep[keep_account_index].dates) {
        if (user_data.accounts.keep[keep_account_index].dates[dates_index].date === curMonth) {
          user_data.accounts.keep[keep_account_index].dates[dates_index].balance -= parseInt(req.body.data.amount);
          user_data.accounts.keep[keep_account_index].curMoney -= parseInt(req.body.data.amount);
          user_data.totalMoney -= parseInt(req.body.data.amount);
          break;
        }
      } 
      break;
    }
  }

  res.json(201);
  
});

app.listen(3333);
console.log('Listening on localhost:3333');
