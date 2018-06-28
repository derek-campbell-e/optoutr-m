module.exports = function Nightmare(){
  const Nightmare = require('nightmare');
  const nightmare = Nightmare({show: false, "x":-1885,"y":76,"width":1866,"height":800, waitTimeout: 1000 * 60 * 1000});
  return nightmare;
};