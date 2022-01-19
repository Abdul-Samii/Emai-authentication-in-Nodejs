const User = require("../model/User");
const mailgun = require("mailgun-js");
const jwt = require("jsonwebtoken");
const DOMAIN = process.env.DOMAIN;
const mg = mailgun({apiKey: process.env.API_KEY, domain: DOMAIN});

//Create user without email activation
exports.signup = (req,res) =>{
    const {name, email, password} = req.body;
    User.findOne({email}).exec((err,user)=>{
        if(user)
        {
            return res.status(400).json({error:"User already exist"});
        }
        let newUser = new User({name,email,password});
        const token = jwt.sign({name,email,password},"verificationToken",{expiresIn:'5m'});
        let code = Math.random()*1000000;
        code = Math.round(code);
        newUser.save((err,success)=>{
            if(err)
            {
                console.log("Error in signup : ",err);
                return res.status(400).json({error:err});
            }
            const data = {
                from: 'noreply@shopay.com',
                to: 'ksamk100474@gmail.com',
                subject: 'documents',
                html:`<p>Your verification code is : ${code}<p/>`
                    
            };
            mg.messages().send(data, function (error, body) {
                console.log(body);
            });
            res.json({message:"Signup Success"});
        });
    });
}