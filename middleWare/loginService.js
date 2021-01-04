const jwt = require("jsonwebtoken")
const moongose = require("mongoose")
const Employer = moongose.model("Employer")

const {JWT_Secret} = require("../keys")


module.exports=(req,res,next)=>{
   
    console.log("in auth")
    const{authorization} = req.headers
    if(!authorization){
        console.log("in auth fail")

     return  res.send(403).json({error:"Token not found"})
    }

    const token  = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_Secret,(err,payload)=>{
        console.log("in auth verify")

        if(err){
            console.log("in auth err")

            return res.status(401).json({error:"user not logged in"})
        }
        const{_id} = payload;
        console.log(payload)
        console.log(_id)
        Employer.findOne({_id}).then((loggedUser)=>{
            req.user = loggedUser
            console.log("in auth success")
            next();
        }).catch((err)=>{
            console.log("in auth failed exit")

            res.status(401).json(err + "User not found in")
        })
    })
 
}