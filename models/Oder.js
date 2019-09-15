const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../constants');
const schema = new schema({
    products:[{type: Schema.Types.ObjectId , ref :'Product'}],
    amount: Number,
    createdBy :{type:'Schema.Types.ObjectId',ref:'User'},
    status: {type:String ,default: constants.ORDER.STATUS.PENDING}
});
const OderModel = mongoose.model("Oder",schema);
module.exports = OderModel;