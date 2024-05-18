// To seperate the params and value by ,
function splitArrayAtFirstComma(arr) {
  const commaIndex = arr.indexOf(',');
  if (commaIndex === -1) {
    return null;
  }
  const firstHalf = arr.slice(0, commaIndex).join('');
  const secondHalf = arr.slice(commaIndex + 1).join('');
  return [firstHalf, secondHalf];
}

module.exports = { splitArrayAtFirstComma };
