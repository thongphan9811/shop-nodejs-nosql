const express = require('express');
const router = express.Router();
const orderModel = require('../../models/Oder');
const productModel = require('../../models/Product');
const midleware = require('../../midleware/checkCustomer');

router.post('/', midleware.AuthCustomer, async (req, res) => {
    try {
        const products = req.body.products;
        const findPro = await productModel.find({ _id: { $in: products }, isDelete: false, count: { $gt: 1 } });
        if (findPro.length != products.length) {
            return res.json({ mess: "khong co du so luong hang" });
        }
        const amount = await findPro.reduce(function (a, b) {
            return a + b.newPrice
        }, 0);
        const updatePro = await productModel.updateMany({ _id: { $in: products } }, { $inc: { count: -1 } });;
        const OderClass = new orderModel({
            products, amount, createdBy: req.user._id
        });
        const order = await OderClass.save();
        return res.json({
            code: 200, mess: "oder thanh cong", data: { order }, hihi: findPro
        });
    } catch (err) {
        console.log(err);
        return res.json({ code: 400, mess: "oder that bai", data: err });
    }
});

router.get('/', midleware.AuthCustomer, async (req, res) => {
    try {
        const findOder = await orderModel.find({ createdBy: req.user._id }).populate('createdBy');
        if (!findOder) return res.json({ mess: "ban chua order mat hang nao ca" });
        return res.json({ code: 200, mess: "tim kiem don order thanh cong", data: findOder });
    } catch (err) {
        return res.json({ code: 400, mess: "that bai", data: err });
    }
});
//sua lại
router.put('/', midleware.AuthAdmin, async (req, res) => {
    try {
        const { products, _id } = req.body;
        const updatePro = await productModel.find({ _id: { $in: products }, isDelete: false });
        if (updatePro.length != products.length)
            return res.json({ mess: "khong co hang oder" });
        const amount = await findPro.reduce(function (a, b) {
            return a + b.newPrice
        }, 0);
        const update = await orderModel.updateOne({ _id }, { products, amount });
        if (!update) return res.json({ mess: "ban khong co quyen update hoac sai _id" });
        return res.json({ code: 200, mess: "cap nhat order thanh cong" });
    } catch (err) {
        return res.json({ code: 400, mess: "that bai", data: err });
    }
});
// thêm khi xóa thì tăng số lượng
router.delete('/', midleware.AuthAdmin, async (req, res) => {
    try {
        const _id = req.body._id;
        if (!_id) throw "ban can nhap _id order muon xoa";
        const delOder = await orderModel.findByIdAndUpdate(_id, { isDelete: true });
        if (!delOder) throw "khong tim thay bai dang can xoa";
        console.log(delOder);
        const updatePro = await productModel.updateMany({ _id: { $in: delOder.products } }, { $inc: { count: +1 } });;
        return res.json({ code: 200, mess: "xoa thanh cong ", data: delOder });
    } catch (err) {
        return res.json({ code: 400, mess: "that bai", data: err });
    }
});

module.exports = router;