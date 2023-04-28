const dotenv = require("dotenv");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

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

  const connectionString = process.env.DATABASE_LIVE.replace(
    "<password>",
    process.env.DATABASE_LIVE_PASSWORD
  );
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connection to DB successful");
    })
    .then(() => {
      app.listen(port, () => {
        console.log("App running");
      });
    });
}

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("App running on port 3000");
// });
