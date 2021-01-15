/* eslint-disable no-console */
const axios = require('axios');

/**
 * Run this file with:
 * $ node --trace-warnings test/axios
 */
async function main() {
  try {
    const token = await axios.get('http://localhost:3000/checkout');
    const payload = {
      itemsCart: [
        { id: 1, name: 'Harry Potter and the Prisoner of Azkaban', quantity: 2 },
        { id: 4, name: 'Ikigai: The Japanese secret to a long and happy life', quantity: 1 },
      ],
      customer: {
        firstname: 'Reinaldy', lastname: 'Rafli', email: 'fakemail@gmail.com', phone: '081234567890',
      },
      billing: {
        firstname: 'Reinaldy', lastname: 'Rafli', email: 'fakemail@gmail.com', phone: '081234567890', address: 'Jln. Pegadaian 3 No. 52', city: 'Jakarta', postal: '10110', country: 'Indonesia',
      },
    };
    const response = await axios.post('http://localhost:3000/checkout', payload, { headers: { token: token.data.token } });
    console.log('\n\n');
    console.log(response);
    console.log('\n\n');
  } catch (error) {
    console.error(error);
  }
}

try {
  main();
} catch (error) {
  console.log(error);
}
