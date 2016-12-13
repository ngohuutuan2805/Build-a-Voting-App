'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    title: String,
    options:[{
        option:String,
        selectedCount: Number
    }],
    createByUser: String
})

module.exports = mongoose.model('Poll', Poll)