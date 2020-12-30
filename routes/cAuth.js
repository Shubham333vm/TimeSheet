const app = require("express")
const router = app.Router();
const mongoose = require("mongoose")
const Employee = mongoose.model("Employee")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../keys")
// const middleware = require("../middleWare/loginService")
router.get("/",(req,res,next)=>{
// res.send("Hello from router")
next()
})

router.post("/csignUp",(req,res)=>{

    console.log("we got invoked-->"+req.body)
    const{name,email,password} = req.body

    console.log(name +" "+ email +" "+ password)
    if(!name || !email || !password){
        console.log("we requested for error")
       return res.status(442).json({error:"please add all the fields"});
    }
     
    else{
        console.log("inside else")

        Employee.findOne({email:email}).then((savedUser)=>{
            console.log("exist findOne")

            if(savedUser){
                console.log("exist")
                res.status(422).json("User Already exist")
            }
            else{

                bcrypt.hash(password,12).then((hasedPassKey)=>{
                    console.log("exist else find")
                    const employee = new Employee({
                        name,
                        email,
                        password:hasedPassKey})
                    console.log("employee created")
    
                    employee.save().then((saved)=>{
                        console.log("exist")
                        res.status(200).json("Employee successfully added")
                    }).catch((err)=>{
                        console.log("exist")
                        res.json("Error while inserting employee")
                    })

                }).catch((err)=>{
                    console.log("error while creating hash")
                })
              
            }

        }).catch((err)=>{

            res.json(err)
        })

        console.log("exiting else")
    }
    
    
    })

router.post("/csignIn",(req,res)=>{

    console.log("In signIn")
    const{email,password}=req.body

    if(!email || !password){
       return res.send("Please provide user email or password") 
    }

    Employee.findOne({email:email}).then((employee)=>{

        bcrypt.compare(password,employee.password).then(matched=>{
            if(matched){

                const token = jwt.sign({_id:employee._id},keys.JWT_Secret);
                res.send({token,employee})
 
            }
            else res.send("Incorrect email or password")
        }).catch((err)=>{
            console.log(err)
        })


    }).catch((err)=>{
            console.log("Password is not correct")
        })
    })

// router.get("/protected",middleware,(req,res)=>{

//     res.send("Hello this is a proteted data")

// })

module.exports=router