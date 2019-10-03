const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    createdBy :{type:Schema.Types.ObjectId ,ref:'User'},
    product :{type:Schema.Types.ObjectId , ref:'Product'},
    isDelete : {type :Boolean ,default: false }
});
const likeProductModel = mongoose.model('LikeProduct',schema);
module.exports= likeProductModel;