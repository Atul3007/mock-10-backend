const express=require("express");
const user_router=express.Router();
const { usermodel } = require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
user_router.use(cors());
var otp;


user_router.post("/emailVerify", async (req, res) => {
  otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  let { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "medistar.hospital301@gmail.com",
      pass: "hoxilrprpqwjbnzi",
    },
  });
  const mailOptions = {
    from: "medistar.hospital301@gmail.com",
    to: email,
    subject: "Here is your OTP for Login",
    text: otp,
  };
  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log(info.response);
      res.send({ msg: "Mail has been Send", otp, email });
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});

user_router.post("/register", async (req, res) => {
    const {name,email,pass} = req.body
    //console.log(address);
    try {
        bcrypt.hash(pass,5 , async(err, secure_password)=> {
            if(err){
                 console.log(err);
                 res.send("not working");
            }else{
                const user = new usermodel({name,email,pass:secure_password});
                await user.save();
                res.send("registerd");
            }
    });
    } catch (error) {
        res.send("Error in registering");
        console.log(error);
    }
})
user_router.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await usermodel.find({email});
        if (user.length) {
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
              if(result){
                const token=jwt.sign({userid:user[0]._id},"masai");
                res.send({ "msg": "Login Successful", "token": token });
              }else{
                res.send("Wrong credientials")    
              }
            });
        }
        else {
            res.send("Wrong credientials")
        }
    } catch (error) {
        res.send("Error in logging");
        console.log(error);
    }
})
module.exports={
    user_router
}