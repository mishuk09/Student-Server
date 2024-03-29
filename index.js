const express = require("express");
const students = require('./student/student.routes');
const app = express();
const port = process.env.port || 5001;

app.use(express.json)
app.use('/students',students)
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
