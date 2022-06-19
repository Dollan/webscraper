'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.listGET = function listGET (req, res, next) {
  Default.listGET()
    .then(function (response) {
      utils.writeJson(res, utils.respondWithCode(response.length>0?200:204, response));
    })
    .catch(function (response) {
      console.log(response);
      utils.writeJson(res, utils.respondWithCode(500, response.toString()));
    });
};
