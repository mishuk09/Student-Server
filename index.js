const express = require('express');
const fs = require('fs').promises; // Using promises version of fs for async/await support
const app = express();
const todos = require('./todos/todos');
const std = require('./todos/Student');
app.use(express.json());
const port = process.env.PORT || 5000;

app.use('/todos', todos);
app.use('/student', std);

app.listen(port, () => {
    console.log("server listen port:", port);
});
