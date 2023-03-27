const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
    const token=localStorage.getItem("token")
    if(token){
        jwt.verify(token,'pranay', function(err, decoded) {
            if(decoded){
                req.body.userID=decoded.userID
                next()
            }else{
                res.send({"msg":"please go first and login!"})
            }
          });
    }else{
        res.send({"msg":"please go first and login!"})
    }
}

module.exports=authentication