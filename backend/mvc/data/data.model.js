import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    "MOBILE NO": { type: String, unique: true, index: true },
    "CITY": { type: String, index: true },
    "NAME": { type: String, index: true },
    "PAN": { type: String, index: true },
    "EMAIL": { type: String, index: true },
    "COMPANY NAME": { type: String, index: true },
    "EMPLOYMENT TYPE": { type: String, index: true },
    "PINCODE": { type: String, index: true },
    "DESIGNATION": { type: String, index: true },
    "OFFICIAL EMAIL ID": { type: String, index: true },
    "DETAILS1": { type: String, index: true },
    "DETAILS2": { type: String, index: true },
    "REMARKS": { type: String, index: true },
    "WHATS APP": { type: String, index: true },
    "DATE": { type: String, index: true },
    "SMS": { type: String, index: true },
    "DATE_3": { type: String, index: true },
    "CALLING": { type: String, index: true },
    "DATE_4": { type: String, index: true },
    "LOGIN DONE": { type: String, index: true },
    "LOGIN BANK": { type: String, index: true },
    "BANKS STATUS": { type: String, index: true },
    "LOGIN DONE_1": { type: String, index: true },
    "LOGIN BANK 2": { type: String, index: true },
    "BANKS STATUS_1": { type: String, index: true },
  },
  { strict: false, timestamps: true }
);

// Creating a unique index for the "MOBILE NO" field
dataSchema.index({ "MOBILE NO": 1 }, { unique: true });
dataSchema.index({ "CITY": 1 });

const Data = mongoose.model("Data", dataSchema);

export default Data;
