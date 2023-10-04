const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const router = require("./routes/user");


dotenv.config({
  path: "./config/env/config.env"
});

connectDatabase();

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000;

app.use("/api", router);


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});