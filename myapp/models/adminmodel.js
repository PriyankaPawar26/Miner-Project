var db = require("./connection")
function adminmodel(){

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
    this.fetchUserDetails=(sunm,callback)=>{
        db.collection("register").find({"email":sunm}).toArray().then((result)=>{
            callback(result)
        }).catch((error)=>{
            console.log(error)
        })
    }

    this.fetchPost = (callback)=>{
        db.collection('upload').find().toArray()
        .then((result)=>{
            callback(result)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    

    this.addcourse = (courseDetails, callback) => {
        console.log("hii")
        db.collection("course").find().toArray()
            .then((val => {
                console.log(val)
                var result = val
                if (result.length > 0) {
                    var max_crsid = result[0]._crsid
                    for (let row of result) {
                        if (max_crsid < row._crsid) {  // crsid= course id
                            max_crsid = row._crsid
                        }
                    }
                    courseDetails._crsid = max_crsid + 1
                } else {
                    courseDetails._crsid = 1
                }

                var flag = 1
                if (result.length>0) 
                {
                    for (let row of result) {
                        if (courseDetails.name==row.name) {
                            flag=0
                            break
                        }
                    }    
                }
                if (flag == 1) 
                {
                   
                    courseDetails.dt = Date()
                    db.collection("course").insertOne(courseDetails, (err, result) => {
                        err ? console.log(err) : callback(true)
                    })
                }else{
                    callback(false)
                }
    
            }))
            .catch((err) => {
                console.log(err)
            })
        console.log("hello")
    }

    this.fetchCourse=(callback)=>{
        db.collection('course').find().toArray()
        .then((result)=>{
            callback(result)
        })
        .catch((error)=>{
            console.log(error)
        })
    }
   

    this.managesCourse = (cDetails, callback) => {
       
        if (cDetails.s == "delete") {
            db.collection("course").deleteOne({ "_crsid": parseInt(cDetails.regid) })
                .then((val) => {
                    callback(val)
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        
    }

   

              // add students    
    this.addstudent = (studentDetails, callback) => {
        console.log("hii")
        db.collection("Btech_student").find().toArray()
            .then((val => {
                console.log(val)
                var result = val
                if (result.length > 0) {
                    var max_id = result[0]._id
                    for (let row of result) {
                        if (max_id < row._id) {  // crsid= course id
                            max_id = row._id
                        }
                    }
                    studentDetails._id = max_id + 1
                } else {
                    studentDetails._id = 1
                }

                var flag = 1
                if (result.length>0) 
                {
                    for (let row of result) {
                        if (studentDetails.email==row.email) {
                            flag=0
                            break
                        }
                    }    
                }
                if (flag == 1) 
                {

                    studentDetails.status = 0
                    studentDetails.role = "student"
                   studentDetails.dt = Date()
                    db.collection("Btech_student").insertOne(studentDetails, (err, result) => {
                        err ? console.log(err) : callback(true)
                    })
                }else{
                    callback(false)
                }
    
            }))
            .catch((err) => {
                console.log(err)
            })
        console.log("hello")
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

        /*
        ------ store Student Profile Pic
        */
        
       

}
module.exports = new adminmodel()