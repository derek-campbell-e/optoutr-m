module.exports = function OptoutrService(){
  let oo = {};

  oo.name = 'optoutr';
  oo.equestTimeout = 0;
  oo.actions = {};
  oo.actions.find = async function(ctx){
    const nightmare = require('../nightmare')();
    try {
      let result = await nightmare.routine(ctx.params);
      return result;
    } catch (error){
      return {error: error.message};
    }
  };

  oo.actions.drivers = async function(ctx){
    const nightmare = require('../nightmare')();
    let result = await nightmare.drivers();
    return result;
  };

  return oo;
};