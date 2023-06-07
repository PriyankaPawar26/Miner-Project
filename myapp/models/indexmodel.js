var db = require("./connection")

function indexmodel() {


    this.registeruser = (userDetails, callback) => {
        console.log("hii")
        db.collection("register").find().toArray()
            .then((val => {
                console.log(val)
                var result = val
                if (result.length > 0) {
                    var max_id = result[0]._id
                    for (let row of result) {
                        if (max_id < row._id) {
                            max_id = row._id
                        }
                    }
                    userDetails._id = max_id + 1
                } else {
                    userDetails._id = 1
                }
                var flag = 1
                if (result.length>0) 
                {
                    for (let row of result) {
                        if (userDetails.email==row.email) {
                            flag=0
                            break
                        }
                    }    
                }
    
                if (flag == 1) 
                {
                    userDetails.status = 0
                    userDetails.role = "user"
                    userDetails.dt = Date()
                    db.collection("register").insertOne(userDetails, (err, result) => {
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
    
    this.userlogin = (userDetails,callback)=>{
        db.collection('register').find({"email":userDetails.email,"password":userDetails.password}).toArray()
        .then((result)=>{
            callback(result) 
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    this.fetchPost = (callback)=>{
        db.collection('upload').find().toArray()
        .then((result)=>{
            callback(result)
        })
        .catch((error)=>{
            callback(error)
        })
    }

    
    }



    module.exports= new indexmodel()

