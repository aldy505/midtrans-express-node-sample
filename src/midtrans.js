const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './../.env') });
const axios = require('axios');

async function transaction(payload) {
  try {
    const AuthorizationHeader = Buffer.from(`${process.env.MIDTRANS_SERVER}:`).toString('base64');
    const response = await axios({
      method: 'post',
      url: process.env.MIDTRANS_ENDPOINT,
      data: payload,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthorizationHeader,
      },
      auth: {
        username: process.env.MIDTRANS_SERVER,
        password: '',
      },
    });
    return new Promise((resolve, reject) => {
      if (response.status === 201) {
        // Success
        return resolve(response.data);
      }
      // Error
      return reject(response.data.error_messages);
    });
  } catch (error) {
    return new Error(error.response.data.error_messages);
  }
}

module.exports = { transaction };
