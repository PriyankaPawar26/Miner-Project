var mongoose = require("mongoose")
var url="mongodb://localhost:27017/Miner_project"
mongoose.connect(url)
var db = mongoose.connection
// console.log(db)
console.log("Successfully connected to mongodb database...")
module.exports=db