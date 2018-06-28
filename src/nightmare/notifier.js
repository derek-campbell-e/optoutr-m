module.exports = function NightmareNotifier(Nightmare){
  const port = 4290;
  const io = require('socket.io-client');
  const socket = io(`http://localhost:${port}`);


  let notifier = {};
  let events = {
    'runRoutine': 'runRoutine'
  };

  notifier.gotoGoogle = function(){
    socket.emit('debug', 'going to google');
    Nightmare.nightmare.goto('http://google.com').wait(2000).evaluate(function(){}).then(function(){});
  };

  notifier.runRoutine = function(person){
    //notifier.debug("RUNNING ROUTINE ON PERSON", person);
    try {
      Nightmare.routine(person);
    } catch (error){
      notifier.debug("error", error.message);
    }
  };

  notifier.finishSite = function(driver, person, profiles){
    console.log("FINISHING UP");
    socket.emit('foundProfiles', driver, person, profiles);
  };

  notifier.debug = function(){
    socket.emit.apply(socket, ['debug', ...arguments]);
  };

  let bind = function(){
    for(let key in events){
      let func = events[key];
      if(notifier.hasOwnProperty(func)){
        socket.on.apply(socket, [key, notifier[func]]);
        socket.emit('err', 'welp', key)
      }
    }
    //socket.emit('error', 'aaaaa');
    //socket.emit('ready');
  };

  let init = function(){
    socket.on('connect', function(){
      bind();
      socket.emit('ready');
    });
    return notifier;
  };

  return init();
};