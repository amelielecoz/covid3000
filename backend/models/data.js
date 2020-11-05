const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    dep: {
      type: Schema.Types.Mixed,
      required: true
    },
    sexe: {
      type: Number,
      required: true
    },
    jour: {
        type: String,
        required: true
    },
    hosp: {
        type: Number,
        required: true
    },
    rea: {
        type: Number,
        required: true
    },
    rad: {
        type: Number,
        required: true
    },
    dc: {
        type: Number,
        required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Data', dataSchema);