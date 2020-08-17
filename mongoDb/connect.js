const mongoose = require('mongoose');
const config = require("config");
let urlConnect = `${config.get("mongoServer")}` // קריאה נתונים מהשרת של הדאטה 
mongoose.connect(urlConnect, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("connected DB");
});

module.exports = db;