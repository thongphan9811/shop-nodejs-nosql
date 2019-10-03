const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    category: String,
    createBy :{type: Schema.Types.ObjectId , ref :'User'},
    isDelete :{type:Boolean ,default :false}
});
const CategoryModel = mongoose.model('Category',schema);

module.exports = CategoryModel;
