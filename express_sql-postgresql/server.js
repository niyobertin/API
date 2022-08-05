const express = require('express');
const bodyParser = require("body-parser");
const studentRouter = require("./student/router");

const app = express();
const port = 3000;


app.use(express.json());
app.use("/students", studentRouter);


app.listen(port, () => console.log(`server is listening to on port ${port}`));

