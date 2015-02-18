'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./bill.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/client/:id', controller.findByClient);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
