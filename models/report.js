const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    Time :Number,
    product :{type: Schema.Types.ObjectId , ref :'Product'},
    views :{type: Number , default :0}
});
const reportModel = mongoose.model('Report',schema);
module.exports = reportModel;