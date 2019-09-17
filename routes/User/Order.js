const express = require('express');
const router = express.Router();
const orderModel =require('../../models/Oder');
const productModel = require('../../models/Product');
const midleware = require('../../midleware/checkCustomer');

router.post('/createOder',midleware.AuthCustomer,async (req,res)=>{
    try{
        const {products,amount,createdBy,status} = req.body;
        const arrProducts = [];
        const findPro = await productModel.find({_id:{$in:products },isDelete:false});
        if(findPro.length !=products.length){
        return res.json({mess:"khong co du so luong hang"});
    }
         const OderClass = new orderModel({
        products ,amount,createdBy:userCustomer._id,status
    });
         const order = await OderClass.save();
        return res.json({
            code :200, mess:"oder thanh cong", data : {order}
        });
    }catch(err){
        return res.json({code :400 ,mess:"oder that bai",data:err});
    }
});

router.get('/getOderByID',midleware.AuthCustomer,async (req,res)=>{
    try{
        const findOder = await orderModel.find({createdBy:userCustomer._id});
        if(!findOder) return res.json({mess:"ban chua order mat hang nao ca"});
        return res.json({code :200 , mess:"tim kiem don order thanh cong",data:findOder});
    }catch(err){
        return res.json({code:400, mess:"that bai",data:err});
    }
});
router.put('/updateOrder',midleware.AuthCustomer,async (req,res)=>{
    try{
        const {products,amount,_id} = req.body;
        const updatePro = await productModel.find({_id:{$in:products },isDelete:false});
        if(updatePro.length != products.length)
            return res.json({mess :"khong co hang oder"});
        const update = await orderModel.updateOne({createdBy:userCustomer._id,_id},{products,amount});
        if(!update) return res.json({mess:"ban khong co quyen update hoac sai _id"});
        return res.json({code :200 ,mess:"cap nhat order thanh cong"});
    }catch(err){
        return res.json({code:400, mess:"that bai",data:err});
    }
});

router.delete('/deleteOder',midleware.AuthCustomer,async (req,res)=>{
    try{
        const _id = req.body._id;
        if(!_id) throw "ban can nhap _id order muon xoa";
        const orderDelete = await orderModel.findOne({_id,createdBy:userCustomer._id});
        if(!orderDelete) throw "khong co order can xoa";
        const delOder = await orderModel.updateOne({_id},{isDelete:true});
        return res.json({ code :200 , mess:"xoa thanh cong ", data :delOder});
    }catch(err){
        return res.json({code:400, mess:"that bai",data:err});
    }
});

module.exports = router;