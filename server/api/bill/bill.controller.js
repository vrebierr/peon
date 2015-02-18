'use strict';

var _ = require('lodash');
var Bill = require('./bill.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

exports.findByClient = function (req, res) {
    Bill.find({client: req.params.id}, function (err, bills) {
        if (err) {return handleError(res, err);}

        return res.status(200).json(bills);
    });
};

/**
 * Get list of billss
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Bill.find(function (err, bills) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(bills);
  });
};

/**
 * Get a single Bill
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Bill.findById(req.params.id, function (err, bill) {
    if (err) { return handleError(res, err); }
    if (!bill) { return res.status(404).end(); }
    return res.status(200).json(bill);
  });
};

/**
 * Creates a new Bill in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Bill.create(req.body, function (err, bill) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(bill);
  });
};

/**
 * Updates an existing Bill in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Bill.findById(req.params.id, function (err, bill) {
    if (err) { return handleError(res, err); }
    if (!bill) { return res.status(404).end(); }
    var updated = _.merge(bill, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(bill);
    });
  });
};

/**
 * Deletes a Bill from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Bill.findById(req.params.id, function (err, bill) {
    if (err) { return handleError(res, err); }
    if (!bill) { return res.status(404).end(); }
    bill.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
