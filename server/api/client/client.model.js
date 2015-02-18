'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    commercialId: {type: String, required: true},
    address: {type: String, required: true},
    activity: String,
    phone: {type: String, required: true},
    commentary: {type: String},
    isDeletable: {type: Boolean, default: true}
});

module.exports = mongoose.model('Client', ClientSchema);
