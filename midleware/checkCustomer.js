const express = require('express');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const routerUser =require('../routes/User/User');
const AuthAdmin = async (req,res,next)=>{
    try{
        
        const token = req.header('sessoin-token');
        if(!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token,routerUser.token_key);
        userAdmin = decode;
        if(userAdmin.role != "admin") throw "ban khong co quyen su dung chuc nang nay";
        next();
    }catch(err){
        return res.json({
            code :400,
            mess : err,
            data:null
        });

    };
};

const AuthCustomer = async (req,res,next)=>{
    try{
        const token = req.header('sessoin-token');
        if(!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token,routerUser.token_key);
        userCustomer = decode;
        if(userCustomer.role != "customer") throw "ban khong co quyen su dung chuc nang nay";
        next();
    }catch(err){
        return res.json({
            code :400,
            mess : err,
            data:null
        });
    }
}
module.exports = {AuthAdmin,AuthCustomer};