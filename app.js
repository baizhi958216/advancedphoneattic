const express = require("express");
const morgan = require("morgan");
const deviceRouter = require("./routers/deviceRouters");
const userRouter = require("./routers/userRouters");
const onlineUserRouter = require("./routers/onlineUserRouters");
const bbsRouter = require("./routers/bbsRouters");
const app = express();

app.use(express.json());

// 访问静态资源
app.use("/public", express.static("public"));
app.use("/favicon.ico", express.static("public/favicon.ico"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 跨域请求
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // 允许前端axios请求
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,PATCH,GET,DELETE,OPTIONS"
  );
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use("/deviceapi/", deviceRouter);
app.use("/authapi/", userRouter);
app.use("/onlineusers/", onlineUserRouter);
app.use("/bbs/", bbsRouter);

module.exports = app;
