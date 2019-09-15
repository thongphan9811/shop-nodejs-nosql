var express = require('express');
var router = express.Router();
const midleware = require('../midleware/checkCustomer');
const CategoryModel = require('../models/Category');

router.post('/CreateCategory',midleware.AuthAdmin,async (req,res)=>{
    try{
        const NameCategory = req.body;
        if(!NameCategory) throw " ban can nhap name Category";
        const findCaregory =await CategoryModel.findOne({NameCategory});
        if(findCaregory) throw "name Category da ton tai";
        const CategoryClass = new CategoryModel({NameCategory,createBy:userAdmin._id});
        const category = await CategoryClass.save();
        return res.json({
            code :200,
            mess :" da them category thanh cong",
            data :{category}
        });
    }catch(err){
        return res.json({code :400 ,mess:"that bai", data :err});
    }
});
router.get('/GetCategory/:NameCategory',midleware.AuthAdmin,async (req,res)=>{
    try{
        const NameCategory = req.params.NameCategory;
        if(!NameCategory){
            const getAll = await CategoryModel.find({});
            if(!getAll) throw "chua co category";
            return res.json({code :200, mess:"lay tat ca", data : getAll});
        }
        const getCategory = await CategoryModel.findOne({NameCategory});
        if(!getCategory) throw "khong co Category";
        return res.json({
            code :200, mess : "da tim thay", data :getCategory
        })
    }catch(err){
        return res.json({code :400 ,mess:"that bai", data :err});
    }
});
router.put('/DeleteCategory/:NameCategory',midleware.AuthAdmin,async (req,res)=>{
    try{
        const NameCategory = req.params.NameCategory;
        if(!NameCategory) throw "moi nhap ten danh muc can xoa";
        const findDeleteCategory = await CategoryModel.findOne({NameCategory});
        if(!findDeleteCategory) throw "khong co danh muc can xoa"; 
        const deleteCategory = await CategoryModel.deleteOne({NameCategory});
        return res.json({code :200 ,mess :"xoa thanh cong",data :deleteCategory});
    }catch(err){
        return res.json({code :400 ,mess:"that bai", data :err});
    }
});
router.put('/UpdateCategory',midleware.AuthAdmin,async (req,res)=>{
    try{
        const newNameCategory = req.body.newNameCategory;
        const oldNameCategory = req.body.oldNameCategory;
        if(!NameCategory) throw " ban can nhap name Category";
        const findUpdateCaregory = await CategoryModel.findOne({NameCategory:oldNameCategory});
        if(!findUpdateCaregory) throw "khong co nameCategory can xoa";
        const update = await CategoryModel.updateOne({NameCategory:findCategory.NameCategory},
            {$set: {NameCategory:newNameCategory,createBy:userAdmin._id}});
        return res.json({code :200 ,mess :"update thanh cong ",data :{update}});

    }catch(err){
        return res.json({code :400 ,mess:"that bai", data :err});
    }
})
module.exports= router;