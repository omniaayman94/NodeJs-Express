const express = require('express');
const router = express.Router();
router.get('/', (_, res) => {
    res.render('index',{title:'My express App',message:'Hello in my express app'});
});

module.exports = router;