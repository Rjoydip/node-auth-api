"uxe strict";
require('dotenv').config();

const cluster = require("cluster");
const os = require("os");
const configJSON = require("./config.json");

const CPUS = os.cpus();

if (cluster.isMaster) {
  CPUS.forEach(() => {
    cluster.fork()
  });
  cluster.on("listening", (worker) => {
    console.log("Cluster %d connected", worker.process.pid);
  });
  cluster.on("disconnect", (worker) => {
    console.log("Cluster %d disconnected", worker.process.pid);
  });
  cluster.on("exit", (worker) => {
    console.log("Cluster %d is dead", worker.process.pid);
    // Ensuring a new cluster will start if an old one dies
    cluster.fork();
  });
} else {
  require(`./v${process.env.API_VERSION || configJSON.API_VERSION}/app`);
}