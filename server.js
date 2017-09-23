const cluster = require("cluster");
const os = require("os");

require('dotenv').config();

const API_VERSION = 1;
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
  const app = require(`./v${API_VERSION}/app`);
  const {
    db
  } = require(`./v${API_VERSION}/configs`);

  app.listen(PORT, () => {
    console.log('Node app is running on port', PORT);
  });

}