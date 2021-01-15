import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: resolve(__dirname, './../.env') });
import axios from 'axios';


export async function transaction(payload: Record<string, any>) {
  try {
    const AuthorizationHeader = Buffer.from(`${process.env.MIDTRANS_SERVER}:`).toString('base64');
    const response = await axios({
      method: 'post',
      url: String(process.env.MIDTRANS_ENDPOINT),
      data: payload,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: AuthorizationHeader,
      },
      auth: {
        username: String(process.env.MIDTRANS_SERVER),
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
    return error.response.data.error_messages;
  }
}
