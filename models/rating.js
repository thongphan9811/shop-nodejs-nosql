const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema ({
    score : Number,
    comment : String,
    createdBy :{type:Schema.Types.ObjectId ,ref:'User'},
    product : {type:Schema.Types.ObjectId ,ref:'Product'},
    isDelete : {type :Boolean ,default: false }
});
const ratingModel = mongoose.model('Rating',schema);
module.exports = ratingModel;