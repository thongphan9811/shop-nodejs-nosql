const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new schema({
    NameCategory: String,
    createBy :{type: Schema.Types.ObjectId}
});
const CategoryModel = mongoose.model('Category',schema);

module.exports = CategoryModel;
