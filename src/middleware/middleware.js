let mid1=function(req,res,next){
    let validation =req.headers.freeAppUser;
    console.log(req.headers);
    if(!validation){
        next();
    }
    else{
        res.send("the request is missing a mandatory header")
    }
}
module.exports.mid1=mid1;

