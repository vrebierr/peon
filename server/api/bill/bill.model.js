'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = new Schema({
    client: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    prestations: [{
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    state: {type: String, default: 'draft'}
});

module.exports = mongoose.model('Bill', BillSchema);
