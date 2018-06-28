module.exports = function OptOutr(){
  let oo = {};
  let broker = require('./moleculer')(oo);
  return oo;
};