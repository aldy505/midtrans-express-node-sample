/* eslint-disable no-restricted-syntax */
/**
 * This function literally calculate the amount to get the total amount.
 * @param {Array} object
 */
function calculateAmount(object) {
  let response = 0;
  for (const item of object) {
    response += parseInt(item.price, 10);
  }
  return response;
}

/**
 * This functions parses item names from itemsCart object into arrays of item names.
 * @param {Array} object
 */
function parseItemName(object) {
  const response = [];
  for (const item of object) {
    response.push(`${item.name}`);
  }
  return response;
}

module.exports = { calculateAmount, parseItemName };
