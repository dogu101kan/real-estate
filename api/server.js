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
let cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));



const PORT = process.env.PORT || 3000;

app.use("/api", routers);

app.use(errorHandler);

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});