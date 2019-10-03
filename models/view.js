const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    product :{type: Schema.Types.ObjectId , ref :'Product'},
    viewer :{type:Schema.Types.ObjectId ,ref:'User'},
    date : Date
});
const viewModel = mongoose.model('View',schema);
module.exports = viewModel;