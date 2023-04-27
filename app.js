const express = require("express");
const NodeCache = require("node-cache");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const userRouter = require("./routes/authRoutes");
const dataRouter = require("./routes/dataRoutes");
const cudRouter = require("./routes/cudRoutes");
const taskRouter = require("./task-subapp/routes/taskRouter");
const complaintRouter = require("./participation-feature/routes/complaintsRoutes");
const suggestionRouter = require("./participation-feature/routes/suggestionRoutes");
const AppError = require("./utils/appError");

const app = express();
const cache = new NodeCache();

app.enable("trust proxy");
app.use(cors());
app.options("*", cors());

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const handleRequest = (req, res, next) => {
  const key = req.url;
  const cachedBody = cache.get(key);

  if (cachedBody) {
    console.log("Cache hit!");
    res.status(200).json(cachedBody);
    return;
  } else {
    next();
  }
};
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);
app.use("/api/v1", handleRequest);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

app.use(express.static(`${__dirname}/public`));

app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/user-data", dataRouter);
app.use("/api/v1/modify", cudRouter); //CUD - Create, Update and Delete  :XD
app.use("/api/v1/complaints", complaintRouter);
app.use("/api/v1/suggestions", suggestionRouter);

app.use("/api/task/v1", taskRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
