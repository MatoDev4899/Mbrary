if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

const { urlencoded } = require("express");
const connectToDB = require("./db/db");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
// app.use(express.static("public"));
app.use(urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use("/authors", authorRouter);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDB(process.env.DATABASE_URL).then(() =>
      console.log("connected to db")
    );
    app.listen(port, () => console.log("connected to server on port " + port));
  } catch (error) {
    console.log(error);
  }
};

startServer();
