const express = require('express');
const router = express.Router();
const midleware = require('../../midleware/checkCustomer');
const CategoryModel = require('../../models/Category');
const productModel = require('../../models/Product');
const orderModel =require('../../models/Oder');

router.get('/getProduct/:ProductName',midleware.AuthAdmin, async (req,res)=>{
    try{
        const ProductName = req.params.ProductName;
       // if(ProductName) ? productModel : productModel = null; 
        const findPro = await productModel.find({name :ProductName}).populate('Category');
        if(!findPro) throw "khong tim thay ten san pham";
        return res.json({code :200 , mess : "tim kiem thanh cong ", data : findPro});
    }catch(err){
        return res.json({
            code :400, mess:"tim kiem that bai ", data :err
        });
    }
});
router.post('/createProduct',midleware.AuthAdmin, async (req,res)=>{
    try{
        const {title,name,oldPrice,newPrice,status,count,category} = req.body;
        const findname =await productModel.findOne({name});
        if(findname) throw "ten hang da ton tai";
        const findCategory = await CategoryModel.findOne({category});
        if(!findCategory) throw " san pham khong co trung danh muc ";
        const ProductClass = new productModel({title,name,oldPrice,newPrice,status,count,category:findCategory._id});
        const product = await ProductClass.save();
        return res.json({code: 200 , mess :"them product thanh cong", data :product});
    }catch(err){
        console.log(err);
        return res.json({ code:400 , mess :"that bai" , data:err    })
    }
});
router.put('/updateProduct/:oldname',midleware.AuthAdmin,async (req,res)=>{
    try{
        const oldname = req.params.oldname;
        const {title,name,oldPrice,newPrice,status,count,category} = req.body;
        const findname =await productModel.findOne({name:oldname});
        if(!findname) throw "khong co ten product ban can update";
        const findCategory = await CategoryModel.findOne({category});
        if(!findCategory) throw " san pham khong co trung danh muc ";
        const updateProduct = await productModel.updateOne({_id:findname._id},{title,name,oldPrice,newPrice,status,count,category:findCategory._id});
        return res.json({code :200 , mess:"update thanh cong", data:updateProduct});
    }catch(err){
        return res.json({ code:400 , mess :"that bai" , data:err });
    }
});
router.delete('/deleteProduct',midleware.AuthAdmin,async (req,res)=>{
    try{
        const name = req.body.name;
        const deleteName = await productModel.findOne({name});
        if(!deleteName) throw " khong tim tay ten can xoa";
        const deleteProduce = await productModel.updateOne({_id:deleteName._id},{isDelete: true});
        const deleteOrder = await orderModel.updateMany({products:deleteName._id},{isDelete:true});
        return res.json({code:200, mess:"xoa thanh cong ",data:deleteProduce});
    }catch(err){
        console.log(err);
        return res.json({ code:400 , mess :"that bai" , data:err });
    }
})
module.exports= router;