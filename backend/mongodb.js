const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eventManagementSystem');

module.exports = mongoose;