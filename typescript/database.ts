import knex, { Transaction, Config } from "knex";
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, './../.env') });

const database = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 1,
    max: 10,
  },
} as Config);

/**
 * This function asks to the database about the price only of the items.
 * @param {Object} payload
 */
export function getAmount(payload: Array<string>): Promise<any> {
  return new Promise((resolve, reject) => database.transaction((trx: Transaction) => {
    trx
      .select('price')
      .from('inventory')
      .whereIn('item_name', payload)
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then((inserts) => resolve(inserts))
    .catch((error) => reject(error)));
}

/**
 * This function asks the database about the whole item data.
 * @param {*} itemNames
 */
export function getItemData(itemNames: Array<string>): Promise<any> {
  return new Promise((resolve, reject) => database.transaction((trx: Transaction) => {
    trx.select()
      .from('inventory')
      .whereIn('item_name', itemNames)
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}

/**
 * Asks the database on all items. Might use this for fetching frontend data.
 */
export function getAllItems(): Promise<any> {
  return new Promise((resolve, reject) => database.transaction((trx: Transaction) => {
    trx
      .select()
      .from('inventory')
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then((data) => resolve(data))
    .catch((error) => reject(error)));
}

/**
 * Initializes table if not yet exists/build.
 */
export async function buildTable() {
  try {
    const tableExists = await database.schema.hasTable('inventory');
    if (!tableExists) {
      const items = [
        {
          id: 1, item_name: 'Harry Potter and the Prisoner of Azkaban', stock: 12, price: 175000,
        },
        {
          id: 2, item_name: 'The Little Prince', stock: 20, price: 59000,
        },
        {
          id: 3, item_name: 'Love for Imperfect Things', stock: 30, price: 215000,
        },
        {
          id: 4, item_name: 'Ikigai: The Japanese secret to a long and happy life', stock: 10, price: 239000,
        },
        {
          id: 5, item_name: 'The Things You Can See Only When You Slow Down', stock: 6, price: 345000,
        },
        {
          id: 6, item_name: 'How to Win Friends and Influence People by Dale Carnegie', stock: 12, price: 185000,
        },
      ];
      await database.schema.createTable('inventory', (table) => {
        table.increments('id').primary();
        table.string('item_name').unique();
        table.integer('stock');
        table.integer('price');
      });
      await database('inventory').insert(items);
    }
  } catch (error) {
    throw new Error(error);
  }
}
