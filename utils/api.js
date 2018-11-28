import axios from 'axios';
import { getAccessToken, getIdToken } from './auth';

const BASE_URL = 'http://localhost:3333';

export { getUserInfo, };

function getUserInfo() {
  const url = `${BASE_URL}/api/userinfo`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
  // return axios.get(url, { headers: { Authorization: `${getIdToken()}` }}).then(response => response.data);
}




//   // axios({
//   //   url: `${BASE_URL}/api/postapi`
//   //   method: 'post',
//   //   data: payload
//   // })
//   // .then(function (response) {
//   //     // your action after success
//   //     console.log(response);
//   // })
//   // .catch(function (error) {
//   //    // your action on error success
//   //     console.log(error);
//   // });

