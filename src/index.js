import "dotenv/config";
import http from "http";
import express from "express";
import routes from "./routes/index";
import database from "./models";

const app = express();
const log = console.log;
app.server = http.createServer(app);

app.use(require("morgan")("dev"));
app.use(express.json({ limit: process.env.BodyLimit }));
app.use(
  require("cors")({
    exposedHeaders: {
      port: process.env.PORT,
      bodyLimit: process.env.BodyLimit,
      corsHeaders: ["Link"]
    }
  })
);

//Routes for application
app.use("/api", routes.user);

//Welcome Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Smart Career BD"
  });
});

//Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("No Matching Route Please Check Again...!!");
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

try {
  database.sequelize.sync({ force: false }).then(() => {
    app.listen(process.env.PORT, () => {
      log(
        require("chalk").bgBlueBright("DATABSE ESTABLISHED"),
        require("chalk").bgGreenBright("API PORT ESTABLISHED ON"),
        require("chalk").bgMagentaBright(process.env.PORT)
      );
    });
  });
} catch (error) {
  log(require("chalk").bgMagentaBright(error));
}
