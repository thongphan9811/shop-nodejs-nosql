var express = require('express');
var router = express.Router();
const midleware = require('../../midleware/checkCustomer');
const CategoryModel = require('../../models/Category');

router.post('/', midleware.AuthAdmin, async (req, res) => {
    try {
        const category = req.body.category;
        console.log(category);
        if (!category) throw " ban can nhap name Category";
        const findCaregory = await CategoryModel.findOne({ category });
        if (findCaregory) throw "name Category da ton tai";
        const CategoryClass = new CategoryModel({ category, createBy: req.user._id });
        const categorySave = await CategoryClass.save();
        return res.json({
            code: 200,
            mess: " da them category thanh cong",
            data: { categorySave }
        });
    } catch (err) {
        console.log(err);
        return res.json({ code: 400, mess: "that bai", data: err });
    }
});
router.get('/:NameCategory', midleware.authUsers, async (req, res) => {
    try {
        const NameCategory = req.params.NameCategory;
        console.log(NameCategory);
        const getCategory = await CategoryModel.findOne({ category: NameCategory }).populate('_id');
        if (!getCategory) throw "khong co Category";
        return res.json({
            code: 200, mess: "da tim thay", data: getCategory
        })
    } catch (err) {
        return res.json({ code: 400, mess: "that bai", data: err });
    }
});
router.get('/', midleware.authUsers, async (req, res) => {
    try {
        const getAll = await CategoryModel.find({}).populate('_id');
        if (!getAll) throw "chua co category";
        return res.json({ code: 200, mess: "lay tat ca", data: getAll });
    } catch (err) {
        return res.json({ code: 400, mess: "that bai", data: err });
    }
});
router.delete('/:NameCategory', midleware.AuthAdmin, async (req, res) => {
    try {
        const NameCategory = req.params.NameCategory;
        if (!NameCategory) throw "moi nhap ten danh muc can xoa";
        const deleteCategory = await CategoryModel.findOneAndUpdate({category: NameCategory},{isDelete:true});
        if(!deleteCategory) throw "khong co category can xoa";
        return res.json({ code: 200, mess: "xoa thanh cong", data: deleteCategory });
    } catch (err) {
        return res.json({ code: 400, mess: "that bai", data: err });
    }
});
router.put('/UpdateCategory', midleware.AuthAdmin, async (req, res) => {
    try {
        const newNameCategory = req.body.newNameCategory;
        const oldNameCategory = req.body.oldNameCategory;
        if (!NameCategory) throw " ban can nhap name Category";
        const findUpdateCaregory = await CategoryModel.findOne({ NameCategory: oldNameCategory });
        if (!findUpdateCaregory) throw "khong co nameCategory can xoa";
        const update = await CategoryModel.updateOne({ NameCategory: findCategory.NameCategory },
            { $set: { NameCategory: newNameCategory, createBy: req.user._id } });
        return res.json({ code: 200, mess: "update thanh cong ", data: { update } });

    } catch (err) {
        return res.json({ code: 400, mess: "that bai", data: err });
    }
})
module.exports = router;