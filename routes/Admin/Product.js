const express = require('express');
const router = express.Router();
const midleware = require('../midleware/checkCustomer');
const CategoryModel = require('../models/Category');
const productModel = require('../models/Product');

router.get('/getProduct/:ProductName', async (req,res)=>{
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
router.post('/createProduct', async (req,res)=>{
    try{
        const {title,name,oldPrice,newPrice,status,count,category} = req.body;
        if
    }catch(err){

    }
})
