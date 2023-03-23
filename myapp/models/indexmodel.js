var db = require("./connection")

function indexmodel() {

    /* registerUser */
     this.registeruser = (userDetails, callback) => {
         
         userDetails.role = "user"
        userDetails.status = 0
        userDetails.dt = Date()
       db.collection("login").insertOne(userDetails, (err, result) => {
             err ? console.log(err) : callback(result)
         })
        }}



    module.exports= new indexmodel()

