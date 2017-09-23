const cluster = require("cluster");
const os = require("os");

require('dotenv').config();
const {
  API_VERSION
} = require("./v1/configs");
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
    process.env.PORT = (!Boolean(process.env.PORT)) ? 8100 : process.env.PORT;
    console.log("Cluster %d is dead", worker.process.pid);
    // Ensuring a new cluster will start if an old one dies
    cluster.fork();
  });
} else {
  const PORT = (!Boolean(process.env.PORT)) ? 8100 : process.env.PORT;
  const app = require(`./v${process.env.API_VERSION || API_VERSION}/app`);
  const {
    db
  } = require(`./v${process.env.API_VERSION || API_VERSION}/configs`);

  app.listen(PORT, () => {
    console.log('Node app is running on port', PORT);
  });

}