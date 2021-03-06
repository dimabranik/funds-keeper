import axios from 'axios';
import { getAccessToken, getIdToken } from './auth';

const BASE_URL = 'http://localhost:3000';

export { getBalances, getAccountsKeep, getAccountsExpense, postIncomes, postExpenses, postAccountsKeep, postAccountsExpense, getIncomes, getExpenses };

function getBalances() {
  const url = `${BASE_URL}/api/v1/balances`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }}).then(response => response.data);
}

function getAccountsKeep() {
  const url = `${BASE_URL}/api/v1/accounts/keep`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }}).then(response => response.data);
}

function getAccountsExpense() {
  const url = `${BASE_URL}/api/v1/accounts/expense`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }}).then(response => response.data);
}



function postIncomes(account_name, amount, description) {
  const url = `${BASE_URL}/api/v1/incomes`;
  let form = new FormData();
  form.set('account_name', account_name);
  form.set('amount', amount)
  form.set('description', description)

  // form.append('amount', amount)

  return axios({
    method: 'post',
    url: url,
    data: form,
    headers: { Authorization: `Bearer ${getIdToken()}`, }, 
    config: { 'Content-Type': 'multipart/form-data', },
    }).then(response => response.data);

    // .then(function (response) {
    //     //handle success
    //     console.log(response);
    // })
    // .catch(function (response) {
    //     //handle error
    //     console.log(response);
    // });


  // return axios.post(url, 
  //   {     
  //     headers: { Authorization: `Bearer ${getIdToken()}`, },
  //     'data': form,
  //     'processData': false,
  //     'contentType': false,
  //     'mimeType': 'multipart/form-data',
  //   }).then(response => response.data);
}



function postExpenses(keep_account_name, expense_account_name, base_amount, description) {
  const url = `${BASE_URL}/api/v1/expenses`;
  // return axios.post(url, 
  //   {     
  //     headers: { Authorization: `Bearer ${getAccessToken()}`, id_token: `${getIdToken()}`, },
  //     form: {
  //       keep_account_name: keep_account_name,
  //       expense_account_name: expense_account_name,
  //       amount: amount,
  //     },
      
  //   }).then(response => response.data);

  let form = new FormData();
  form.set('keep_account_name', keep_account_name);
  form.set('expense_account_name', expense_account_name)
  form.set('base_amount', base_amount) // Amount in Keep Account currency.	Require: Yes, Type:	double
  // form.set('quote_amount', quote_amount)
  form.set('description', description)
  // form.set('date', date)


  return axios({
    method: 'post',
    url: url,
    data: form,
    headers: { Authorization: `Bearer ${getIdToken()}`, }, 
    config: { 'Content-Type': 'multipart/form-data', },
    }).then(response => response.data);
}




  // return axios({
  //   url: `${BASE_URL}/api/postapi`
  //   method: 'post',
  //   data: payload
  // })
  // .then(function (response) {
  //     // your action after success
  //     console.log(response);
  // })
  // .catch(function (error) {
  //    // your action on error success
  //     console.log(error);
  // });



function postAccountsKeep(keep_account_name, base_currency, initial_balance) {
  const url = `${BASE_URL}/api/v1/accounts/keep`;
  
  let form = new FormData();
  form.set('name', keep_account_name);
  form.set('base_currency', base_currency)
  form.set('initial_balance', initial_balance)

  return axios({
    method: 'post',
    url: url,
    data: form,
    headers: { Authorization: `Bearer ${getIdToken()}`, }, 
    config: { 'Content-Type': 'multipart/form-data', },
  }).then(response => response.data);
}

function postAccountsExpense(expense_account_name, base_currency, month_expenses_limit) {
  const url = `${BASE_URL}/api/v1/accounts/expense`;
  
  let form = new FormData();
  form.set('name', expense_account_name);
  form.set('base_currency', base_currency)
  form.set('month_expenses_limit', month_expenses_limit)

  return axios({
    method: 'post',
    url: url,
    data: form,
    headers: { Authorization: `Bearer ${getIdToken()}`, }, 
    config: { 'Content-Type': 'multipart/form-data', },
  }).then(response => response.data);
}


function getIncomes(account_name) {
  const url = `${BASE_URL}/api/v1/incomes`;
  if (account_name == '') {
    return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }}).then(response => response.data);
  } else {
    return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }, params: {account_name: account_name}}).then(response => response.data);
  }
}

function getExpenses(keep_account_name, expense_account_name) {
  const url = `${BASE_URL}/api/v1/incomes`;
  if (keep_account_name != '' && expense_account_name != '') {
    return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }, params: {keep_account_name: keep_account_name, expense_account_name: expense_account_name}}).then(response => response.data);
  } else if (expense_account_name != '') {
    return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }, params: {expense_account_name: expense_account_name}}).then(response => response.data);
  } else {
    return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }}).then(response => response.data);
  }
}