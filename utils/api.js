import axios from 'axios';
import { getAccessToken, getIdToken } from './auth';

const BASE_URL = 'http://localhost:3000';

export { getUserInfo, getKeepAccounts, getExpenseAccounts, postIncome, postExpense };

function getUserInfo() {
  const url = `${BASE_URL}/api/v1/balances`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }}).then(response => response.data);
}

function getKeepAccounts() {
  const url = `${BASE_URL}/api/v1/accounts/keep`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }}).then(response => response.data);
}

function getExpenseAccounts() {
  const url = `${BASE_URL}/api/v1/accounts/expense`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}`, }}).then(response => response.data);
}



function postIncome(account_name, amount, description) {
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



function postExpense(keep_account_name, expense_account_name, base_amount, description) {
  const url = `${BASE_URL}/api/v1/expense`;
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
