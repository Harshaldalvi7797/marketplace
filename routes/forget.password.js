let express = require("express");
let router = express.Router();
let User = require("../dbModel/user");
let bcrypt=require("bcrypt");
let joi = require("@hapi/joi");

router.post("/forgetpassword/:token", async (req,res)=>
{
    let user = await User.userModel.findOne({
        "resetpasswordtoken":req.params.token,
        "resetpasswordexpire":
        {
            $gt:Date.now()
        }
    })
    if(!user) { return res.status(403).send({message:"invalid token or token got expires"}) }
    let {error} = validationError(req.body);
    if(error) { return res.send(error.details[0].message) };
    // @ts-ignore
    let oldpassword = await bcrypt.compare(req.body.UserLogin.password , user.UserLogin.password);
    if(oldpassword) { return res.status(402).send({message :"its same ."}) };
    console.log(oldpassword);
   
   

    // @ts-ignore
    user.UserLogin.password = req.body.UserLogin.password;
    
    // @ts-ignore
    user.resetpasswordexpire = undefined;
   
    // @ts-ignore
    user.resetpasswordtoken = undefined;

    let salt = await bcrypt.genSalt(10);
  
    // @ts-ignore
    user.UserLogin.password = await bcrypt.hash(user.UserLogin.password, salt);
 
     await user.save();
     res.send({message:"password updated"})

})

function validationError(error)
{
    
    let schema = joi.object({
        UserLogin:{
            password:joi.string().required()
        }
    })
    return schema.validate(error);
}

module.exports=router;