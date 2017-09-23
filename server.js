const cluster = require("cluster");
const os = require("os");

const API_VERSION = 1;
const CPUS = os.cpus();

if (cluster.isMaster) {
  CPUS.forEach(function () {
    cluster.fork()
  });
  cluster.on("listening", function (worker) {
    console.log("Cluster %d connected", worker.process.pid);
  });
  cluster.on("disconnect", function (worker) {
    console.log("Cluster %d disconnected", worker.process.pid);
  });
  cluster.on("exit", function (worker) {
    console.log("Cluster %d is dead", worker.process.pid);
    // Ensuring a new cluster will start if an old one dies
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || 8080;
  const app = require(`./v${API_VERSION}/app`);
  const {
    db
  } = require(`./v${API_VERSION}/configs`);

  app.listen(PORT, function () {
    console.log('Node app is running on port', PORT);
  });

}