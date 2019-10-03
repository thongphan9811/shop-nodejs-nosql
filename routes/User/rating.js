const express = require('express');
const router = express.Router();
const midleware = require('../../midleware/checkCustomer');
const productModel = require('../../models/Product');
const ratingModel = require('../../models/rating');

router.post('/', midleware.AuthCustomer, async (req, res) => {
    try {
        const { score, comment, product } = req.body;
        if(score <6) throw "chi danh gia 5 sao ";
        const checkrating = await ratingModel.findOne({ product, createdBy: req.user._id });
        if (checkrating) throw "ban da danh gia product nay roi :))";
        const UPrating = await productModel.findById(product);
        if (!UPrating) throw "khong co product ";
        const ratingClass = new ratingModel({
            score, comment, createdBy: req.user._id, product
        });
        const rating = await ratingClass.save();
        const UPavenge = await ratingModel.find({ product });
        const avangeRating = await UPavenge.reduce(function(a,b){
             return a + b.score;
        },0);
        const hihi = (avangeRating)/(UPavenge.length);
        const updateRating = await productModel.updateMany({ _id: product }, { $inc: { ratingCount: +1 } , avangeRating: hihi });
        return res.json({ code: 200, mess: "danh gia thanh cong ", data: rating });
    } catch (err) {
        console.log(err);
        return res.json({ code: 400, mess: "danh gia that bai mess", data: err });
    }
});
router.put('/', midleware.AuthCustomer, async (req, res) => {
    try {
        const { _id,score, comment } = req.body;
        if(score <6) throw "chi danh gia 5 sao "
        const checkrating = await ratingModel.findOne({ _id, createdBy: req.user._id });
        if (!checkrating) throw "ban chua danh gia bai viet nay , hoac ban khong co quyen update";
        const updateRating = await ratingModel.findByIdAndUpdate({_id},{$set:{score,comment}});
        const UPavenge = await ratingModel.find({ product: checkrating.product });
        const avangeRating = await UPavenge.reduce(function(a,b){
            return a + b.score;
        },0)
        const aven = avangeRating/UPavenge.length;
        const updateRatingPro = await productModel.findByIdAndUpdate( checkrating.product, {$set: { avangeRating:aven} });
        return res.json({ code:200 ,mess:"update thanh cong rating",data:updateRating});
    } catch (err) {
        return res.json({ code: 400, mess: "danh gia that bai mess", data: err });
    }
});
//test ki hon
router.delete('/',midleware.authUsers,async(req,res)=>{
    try{
        const _id = req.body._id;
        const checkrating = await ratingModel.findOne({ _id, createdBy: req.user._id });
        if (!checkrating) throw " ban chua danh gia bai viet hoac khong co quyen xoa";
        const updateRating = await ratingModel.findByIdAndUpdate({_id},{$set:{isDelete:true}});
        //middleware
        return res.json({code:200,mess:"xoa thanh cong ", data :updateRating});
    }catch(err){
        return res.json({ code: 400, mess: "danh gia that bai mess", data: err });
    }
})

module.exports=router;