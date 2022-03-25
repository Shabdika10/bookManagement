const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const isValidRequestBody = function(requestBody){
    return Object.keys(requestBody).length>0
}

const isvalidTitle = function(title){
    return ["Mr", "Mrs","Miss"].indexOf(title) !== -1
}





const createUser = async function(req,res){
  
try{ 
    
    const data = req.body
//if(!data){return res.status(400).send({status:false, ERROR: "Please input some data to create User"})}

if(!isValidRequestBody(data)){return res.status(400).send({status:false, ERROR: "please provide Data"})}

if(!isValid(data.title)){return res.status(400).send({status:false, ERROR: "title required"})}
if(!isvalidTitle(data.title)){return res.status(400).send({status:false, ERROR: "valid title required"})}


if(!isValid(data.name)){return res.status(400).send({status:false, ERROR: "Name required"})}  


if (!isValid(data.phone)) {
    return res.status(400).send({ status: false, msg: "mobile is required" })
}

if (!/^([+]\d{2})?\d{10}$/.test(data.phone)) {return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" });} 


if(!isValid(data.email)){return res.status(400).send({status:false, ERROR: "Email required"})} 
if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) {return res.status(400).send({ status: false, msg: "Please provide a valid email" });}


if(!isValid(data.password)){return res.status(400).send({status:false, ERROR: "Password required"})}  
if(! (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password)) ){return res.status(400).send({status:false , msg:"please provide a valid password with one uppercase letter ,one lowercase, one character and one number "})}


let duplicateEmail = await userModel.findOne({email: data.email}) 
     if(duplicateEmail){return res.status(400).send({status:false , msg:"Email already exists"})}

let duplicateMobile = await userModel.findOne({phone: data.phone}) 
     if(duplicateMobile){return res.status(400).send({status:false , msg:"mobile number already exists"})}




 const savedData = await userModel.create(data)
 return res.status(201).send({status:true, userData: savedData})



}catch (error){
   return res.status(500).send({Status:false, ERROR: error.message })
}}



const userLogin = async function(req,res){

try{
    let data= req.body
//const requiredData ={ email:data.email, password:data.password}

if(!isValid(data.email)){return res.status(400).send({status:false, ERROR: "please input valid emailId"})}

if(!isValid(data.password)){return res.status(400).send({status:false, ERROR: "please input valid password"})}

const user= await userModel.findOne({email:data.email, password:data.password})
if(!user){return res.status(404).send({status:false, ERROR:"User not  found"})}

const token = jwt.sign({
    userId: data.emaill._id,
}, "project3group17",{expiresIn:'300s'})

res.status(200).setHeader("group17", token)
return res.status(201).send({status:true,message: "SuccessFully LoggedIn",TOKEN:token})

}catch (err){
    res.status(500).send({status:false, ERROR: err.message})
}}





module.exports.createUser = createUser
module.exports.userLogin=userLogin