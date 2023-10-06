const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const routers = require("./routers/index");
const errorHandler = require("./middlewares/errors/errorHandler");


dotenv.config({
  path: "./config/env/config.env"
});

connectDatabase();

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000;

app.use("/api", routers);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});