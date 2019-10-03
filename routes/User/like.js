const express = require('express');
const router = express.Router();
const productModel = require('../../models/Product');
const userModel = require('../../models/User');
const likeModel = require('../../models/likeProducts');
const midleware = require('../../midleware/checkCustomer');
//neu co roi thi doi lai bang true
router.post('/', midleware.AuthCustomer, async (req, res) => {
    try {
        const product = req.body.product;
        if (!product) throw "ban can nhap product muon like";
        const checkPro = await productModel.findById({_id: product});
        if(!checkPro) throw "khong co san pham ";
        const checklike = await likeModel.findOne({createdBy:req.user._id,product,isDelete:false});
        if(checklike) throw "ban da like san pham nay ";
        const likeClass = new likeModel({
            createdBy :req.user._id,
            product 
        });
        const like = await likeClass.save();
        const coutpro =  await productModel.findByIdAndUpdate({_id:product},{$inc: {likeCount:+1}});
        return res.json({ code :200 ,mess:"like san pham thanh cong"});
    } catch (err) {
        console.log(err);
        return res.json({ code :400 ,mess:"like that bai",data :err});
    }
});
router.put('/',midleware.AuthCustomer,async (req,res)=>{
    try{
        const product = req.body.product;
        if (!product) throw "ban can nhap product muon like";
        const checklike = await likeModel.findOne({createdBy:req.user._id,product,isDelete:false});
        if(!checklike) throw "ban chua like product hoac sai id product";
        const unlike = await likeModel.updateOne({createdBy:req.user._id,product,isDelete:false},{isDelete:true});
        const coutpro =  await productModel.findByIdAndUpdate({_id:product},{$inc: {likeCount:-1}});
        return res.json({ code :200 ,mess:"unlike thanh cong ",data:unlike});
    }catch(err){
        return res.json({ code :400 ,mess:"unlike that bai",data :err});
    }
})
module.exports = router;