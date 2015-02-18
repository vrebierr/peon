'use strict';

var _ = require('lodash');
var Client = require('./client.model');

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of clientss
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Client.find(function (err, clients) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(clients);
  });
};

/**
 * Get a single Client
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Client.findById(req.params.id, function (err, client) {
    if (err) { return handleError(res, err); }
    if (!client) { return res.status(404).end(); }
    return res.status(200).json(client);
  });
};

/**
 * Creates a new Client in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Client.create(req.body, function (err, client) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(client);
  });
};

/**
 * Updates an existing Client in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Client.findById(req.params.id, function (err, client) {
    if (err) { return handleError(res, err); }
    if (!client) { return res.status(404).end(); }
    var updated = _.merge(client, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(client);
    });
  });
};

/**
 * Deletes a Client from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Client.findById(req.params.id, function (err, client) {
    if (err) { return handleError(res, err); }
    if (!client) { return res.status(404).end(); }
    client.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
