const dotenv = require("dotenv");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
dotenv.config({ path: "./config.env" });

const app = require("./app");

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("App running on port 3000");
  });
}

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("App running on port 3000");
// });
