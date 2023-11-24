const mongoose = require("mongoose");
const TransferSchema = new mongoose.Schema({
    account_bank: {type:String, require:true},
    account_number: {type:String, require:true},
    amount: {type:Number, require:true},
    narration: {type:String},
    currency: {type:String, require:true},
    reference: {type:String},
    callback_url: {type:String},
    debit_currency: {type:String, require:true},
    status: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
},   {timestamp: true}
);

module.exports = mongoose.model('Transfer', TransferSchema);
