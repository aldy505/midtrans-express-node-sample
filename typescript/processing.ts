export function calculateAmount(object: Array<Record<string,any>>): number {
  let response = 0;
  for (const item of object) {
    response += parseInt(item.price);
  }
  return response;
}

export function parseItemName(object: Array<Record<string, any>>): Array<string> {
  const response = [];
  for (const item of object) {
    response.push(`${item.item_name}`);
  }
  return response;
}
