var db = require("./connection")
function hodmodel(){

    this.fetchusers = (callback)=>{
        db.collection('register').find({"role":"user"}).toArray()
        .then((result)=>{
            callback(result) 
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    this.managestaffstatus = (sDetails, callback) => {
        if (sDetails.s == "block") {
            db.collection("register").updateOne({ "_id": parseInt(sDetails.regid) }, { $set: { "status": 0 } })
                .then((val) => {
                    console.log("hello")
                    callback(val)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else if (sDetails.s == "verify") {
            db.collection("register").updateOne({ "_id": parseInt(sDetails.regid) }, { $set: { "status": 1 } })
                .then((val) => {
                    console.log("hii")
                    callback(val)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            db.collection("register").deleteOne({ "_id": parseInt(sDetails.regid) })
                .then((val) => {
                    callback(val)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    this.fetchAll=(catnm,callback)=>{
        db.collection(catnm).find().toArray()
        .then((result)=>{
            callback(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    this.upload = (catnm,subcatnm,filenm, callback) => {
        var cDetails = {}
        cDetails.catnm = catnm
        cDetails.subcatnm = subcatnm
        cDetails.caticonnm = filenm
        db.collection("upload").find().toArray()
            .then((result) => {
                console.log(result)
                if (result.length > 0) {
                    var max_id = result[0]._id
                    for (let row of result) {
                        if (max_id < row._id) {
                            max_id = row._id
                        }
                    }
                    cDetails._id = max_id + 1
                } else {
                    cDetails._id = 1
                }
                var flag = 1
                
                if (flag == 1) 
                {
                    db.collection("upload").insertOne(cDetails, (err, result) => {
                        err ? console.log(err) : callback(true)
                    })
                }else{
                    callback(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }



    this.fetchBtechStd = (callback) => {  
        db.collection('Btech_student').find({ "role": "student" }).toArray()
            .then((result) => {
                callback(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    this.manageStudent = (stdDetails, callback) => {
       
        if (stdDetails.s == "delete") {
            db.collection("Btech_student").deleteOne({ "_id": parseInt(stdDetails.regid) })
            .then((val) => {
                callback(val)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        
        
    }

}
module.exports = new hodmodel()