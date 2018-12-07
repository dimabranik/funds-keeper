import axios from 'axios';
import { getAccessToken, getIdToken } from './auth';

const BASE_URL = 'http://localhost:3333';

export { getUserInfo, getKeepAccounts, getExpenseAccounts, postIncome, postExpense };

function getUserInfo() {
  const url = `${BASE_URL}/api/userinfo`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}`, id_token: `${getIdToken()}`, }}).then(response => response.data);
}

function getKeepAccounts() {
  const url = `${BASE_URL}/v1/accounts/keep`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}`, id_token: `${getIdToken()}`, }}).then(response => response.data);
}

function getExpenseAccounts() {
  const url = `${BASE_URL}/v1/accounts/expense`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}`, id_token: `${getIdToken()}`, }}).then(response => response.data);
}

function postIncome(account_name, amount) {
  const url = `${BASE_URL}/v1/income`;
  return axios.post(url, 
    {     
      headers: { Authorization: `Bearer ${getAccessToken()}`, id_token: `${getIdToken()}`, },
      data: {
        account_name: account_name,
        amount: amount,
      },
      
    }).then(response => response.data);
}

function postExpense(keep_account_name, expense_account_name, amount) {
  const url = `${BASE_URL}/v1/expense`;
  return axios.post(url, 
    {     
      headers: { Authorization: `Bearer ${getAccessToken()}`, id_token: `${getIdToken()}`, },
      data: {
        keep_account_name: keep_account_name,
        expense_account_name: expense_account_name,
        amount: amount,
      },
      
    }).then(response => response.data);
}


  // axios({
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
