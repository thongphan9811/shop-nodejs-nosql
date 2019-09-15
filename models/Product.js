const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {constants} = require('../constants');
const schema = new schema({
    title: String,
    name: String,
    oldPrice :Number,
    newPrice :Number,
    status :{type:String ,default :constants.PRODUCT.ACTIVE},
    count :Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' }
});
const ProductModel = mongoose.model("Product",schema);
module.exports = ProductModel;
