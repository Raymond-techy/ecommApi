const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const product = require("./routes/product");

const auth = require("./routes/auth");

require("./startup/connectdb")();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/product", product);
app.use("/auth", auth);

app.listen(4040, () => console.log("started on port 4040"));
