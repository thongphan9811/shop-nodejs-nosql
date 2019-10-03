const express = require('express');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const routerUser = require('../routes/User/User');
const AuthAdmin = async (req, res, next) => {
    try {
        const token = req.header('sessoin-token');
        if (!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token, routerUser.token_key);
        req.user = decode;
        if (req.user.role != "admin") throw "ban khong co quyen su dung chuc nang nay";
        next();
    } catch (err) {
        return res.json({
            code: 400,
            mess: err,
            data: null
        });

    };
};
const authUsers = async (req, res, next) => {
    try {
        const token = req.header('sessoin-token');
        if (!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token, routerUser.token_key);
        req.user = decode;
        next();
    } catch (err) {
        return res.json({
            code: 400,
            mess: err,
            data: null
        });
    }
}
const AuthCustomer = async (req, res, next) => {
    try {
        const token = req.header('sessoin-token');
        if (!token) throw " ban can dang nhap ";
        const decode = await jwt.verify(token, routerUser.token_key);
        req.user = decode;
        if (req.user.role != "customer") throw "ban khong co quyen su dung chuc nang nay";
        next();
    } catch (err) {
        return res.json({
            code: 400,
            mess: err,
            data: null
        });
    }
}
function UpRatingProduct(arr) {
    let tong = 0;
    let avenge = UPavenge.map(obj => {
        tong = tong + obj.score;
        return tong;
    })
    console.log(tong);
    req.avangeRating = tong / UPavenge.length;
    next();
}
module.exports = { AuthAdmin, AuthCustomer, authUsers,UpRatingProduct };