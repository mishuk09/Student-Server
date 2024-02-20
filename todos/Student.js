const express = require('express');
const router = express.Router();
const filePath = "./data.json"
const fs = require('fs');
const { route } = require('./todos');


router.get('/std', (req, res) => {
    res.send("HI")
})

module.exports = router;