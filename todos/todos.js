const express = require('express');
const router = express.Router();
const filePath = "./data.json"
const fs = require('fs');

// router.get('/read', (req, res) => {
//     res.send('hi')
// })
router.get('/read', (req, res) => {
    var data = loadData();
    res.json(data);
})

router.post('/', (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var isCompleted = req.body.isCompleted;
    var data = loadData();
    data = [...data, { id, title, isCompleted }];
    saveData(data);
    res.json(data);

})


router.delete('/:id', (req, res) => {
    var id = req.params.id;
    var data = loadData();
    var newData = data.filter((item) => item.id != id);
    saveData(newData);
    res.json(newData);
})
router.put('/:id', (req, res) => {
    var id = req.params.id;
    var title = req.body.title;
    var isCompleted = req.body.isCompleted;
    var data = loadData();
    var dataaa = data.map((item) => item.id == id ? { id, title, isCompleted } : item);

    saveData(dataaa);
    res.json(dataaa);
})

const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data));
}
const loadData = () => {
    var data = fs.readFileSync(filePath);
    if (data) return JSON.parse(data.toString());
    else return [];
}

module.exports = router;