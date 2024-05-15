const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Beneficiary_Schema = new Schema({


    brandUser_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brands",
      },


  beneficiary_name : {
    type : String
  },

  beneficiary_mobile : {
    type: String
  },

  bank_acc_no : {
    type: String
  },

  ifsc_code : {
    type: String
  },

  open_beneficiary_id : {
    type: String
  },

  linked_virtual_acc_id : {
    type: String
  },


  is_del: {
    type: Boolean,
    default: false,
  },

  is_active: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
  },
});

const Beneficiary_Schema_Model = mongoose.model("beneficiaries", Beneficiary_Schema);
module.exports = Beneficiary_Schema_Model;
