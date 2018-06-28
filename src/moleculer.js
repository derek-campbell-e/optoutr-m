module.exports = function Moleculer(OptOutr){
  const UUID = require('./common/uuid');
  const { ServiceBroker } = require("moleculer");
  let uuid = UUID();
  OptOutr.nodeID = uuid;

  const broker = new ServiceBroker({
    nodeID: uuid,
    transporter: "nats://localhost:4222",
    logger: console,
    logLevel: "debug",
    requestTimeout: 5 * 1000,
    requestRetry: 3,
    registry: {
      strategy: "RoundRobin"
    },
    metrics: true,
  });

  broker.loadServices(folder = "./src/services", fileMask = "**/*.service.js");
  broker.start();

  return broker;
};