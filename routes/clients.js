var express = require('express');
var router = express.Router();
const path = require('path')

router.get('/', function (req, res) {
    res.send('Welcome to our API!');
});

router.get('/users', function (req, res) {
    res.json([
        { name: "Brian" }
    ]);
});

module.exports = router;
