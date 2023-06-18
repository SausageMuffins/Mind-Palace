const express = require('express');
var router = express.Router();

/* GET echo listing. */
router.get('/:msg', function(req, res, next) {
    const msg = req.params.msg;
    res.send(`${msg}`);
});

module.exports = router;
