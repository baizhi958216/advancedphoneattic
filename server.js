const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});
const app = require("./app");
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    console.log("\n\n数据库连接失败\n\n", err);
  });

const DB_PORT = process.env.PORT;
app.listen(DB_PORT, () => {
  console.log(
    `开始监听端口 ${DB_PORT} 你可以打开http://localhost:8000/public/index.html`
  );
});
