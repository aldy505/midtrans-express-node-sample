const { resolve } = require('path');
const express = require('express');
const cors = require('cors');
const { v4 } = require('uuid');
const iso = require('iso-3166-1');
const { calculateAmount, parseItemName } = require('./processing');
const { transaction } = require('./midtrans');
const {
  getItemData, getAmount, buildTable, getAllItems,
} = require('./database');
require('dotenv').config({ path: resolve(__dirname, './../.env') });

const app = express();

/**
 * For best-practice on production usage, you can try to use these as middleware:
 * https://github.com/analog-nico/hpp
 * https://github.com/helmetjs/helmet
 * https://github.com/nfriedly/express-rate-limit
 *
 * To use them, simply install & import, then do:
 * app.use(helmet());
 * app.use(hpp());
 * app.use(expressRateLimit({
 *   windowMs: 10 * 60 * 1000,
 *   max: 100
 * }))
 */

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('case sensitive routing', true);

app.get('/checkout', (req, res) => {
  // You should replace this with CSRF token middleware, it's more secure.
  // But for the sake of simplicity and showing how Midtrans work, this is fine.
  res.status(200).json({
    token: Date.now(),
  });
});

app.post('/checkout', async (req, res) => {
  // Resolve token fetched from GET /checkout
  // If the token is not more than 2 hours from now.
  if (req.headers.token > Date.now() - 7200000) {
    /**
         * Sample req.body object:
         * {
         *   itemsCart: [
         *      { id: x, name: "xx", quantity: x }
         *   ],
         *   customer: {
         *      firstname: "xxx",
         *      lastname: "xxx",
         *      email: "xxx",
         *      phone: "xxx"
         *   },
         *   billing: {
         *      firstname: "xxx",
         *      lastname: "xxx",
         *      email: "xxx",
         *      phone: "xxx",
         *      address: "xxx",
         *      city: "xxx",
         *      postal: "xxx",
         *      country: "xxx"
         *   }
         * }
         */
    try {
      const itemsName = parseItemName(req.body.itemsCart);
      const amountData = await getAmount(itemsName);
      const totalGrossAmount = await calculateAmount(amountData);
      const itemDetails = await getItemData(itemsName);
      const payload = {
        transaction_details: {
          order_id: v4(),
          gross_amount: totalGrossAmount,
        },
        items_details: itemDetails,
        customer_details: {
          first_name: req.body.customer.firstname,
          last_name: req.body.customer.lastname,
          email: req.body.customer.email,
          phone: req.body.customer.phone,
          billing_address: {
            first_name: req.body.billing.firstname,
            last_name: req.body.billing.lastname,
            email: req.body.billing.email,
            phone: req.body.billing.phone,
            address: req.body.billing.address,
            city: req.body.billing.city,
            postal_code: req.body.billing.postal,
            country_code: iso.whereCountry(req.body.billing.country).alpha3,
          },
        },
      };
      const midtransResponse = await transaction(payload);
      res.status(200).json(midtransResponse);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(400).json({
      message: 'Token expired',
    });
  }
});

app.get('/items', async (req, res) => {
  try {
    const data = await getAllItems();
    res.status(200).json({ items: data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.DEVELOPMENT_PORT, async () => {
    await buildTable();
    // eslint-disable-next-line no-console
    console.log(`Express App is running on http://localhost:${process.env.DEVELOPMENT_PORT}`);
  });
} else if (process.env.NODE_ENV === 'production') {
  app.listen(process.env.PRODUCTION_PORT, async () => {
    await buildTable();
  });
}
