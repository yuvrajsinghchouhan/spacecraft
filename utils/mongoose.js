/**
 * Created by vladthelittleone on 27.02.16.
 */
var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('database:uri'), config.get('database:options'));

module.exports = mongoose;
