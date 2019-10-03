var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../../models/User');
const constants = require('../../constants/index');
const token_key = 'asdasdhs';
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
var moment = require('moment');
router.post('/login',async (req,res)=>{
    try{
        const{username,password} = req.body;
         if(!username) return res.json({mess :"ban can nhap username"});
         if(!password) return res.json({mess :"ban can nhap password"});
         const findUsername = await UserModel.findOne({username});
         console.log(typeof(moment().format('DD/MM/YYYY')));
         if(!findUsername) throw "ban nhap sai username hoac chua dang ki";
         const checkPass = await bcrypt.compareSync(password,findUsername.password);
         if(!checkPass) throw "password khong dung";
         const JsonUser =JSON.parse(JSON.stringify(findUsername));
         const token = jwt.sign(JsonUser,token_key);
         res.setHeader('set-cookie',cookie.serialize('sessoin-token',token,{
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
         }))
         return res.json({
             code :200 , mess:"dang nhap thanh cong",data:{JsonUser}
         });
    }catch(err){
        console.log(err);
        return res.json({
            code :400,
            mess : err
        })
    }
});

router.post('/register',async (req,res)=>{
    try{
        const {username ,password,role} = req.body;
        console.log(username);
        const findUserName = await UserModel.findOne({username:username});
        if(findUserName)
            return res.json({mess:"ten dang ki da ton tai"});
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password,salt);
        if(!role){
            const CustomerClass = new UserModel ({username ,password:hash});
            const customer = await CustomerClass.save();
            return res.json({ code:200 ,mess :'dang ki thanh cong ' ,data :{customer}});
        }
        const AdminClass = new UserModel({username,password:hash,role: constants.USER.ROLE.ADMIN});
        const admin = await AdminClass.save();
        return res.json({ code:200 ,mess :'dang ki thanh cong ' ,data :{admin}});

    }catch(err){
        return res.json({
            code:400,
            mess:"dki that bai ",
            data : err
        });
    };
});
module.exports= {router,token_key};