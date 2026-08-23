import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVerificationKey {
  _id?: unknown;
  id: string;
  code: string;
  productName: string;
  batchNumber: string;
  mfgDate: string;
  expDate: string;
  hplcConcentration: string;
  purity: string;
  sealStatus: string;
  createdAt?: string | Date;
}

export interface IVerificationKeyDocument extends Omit<IVerificationKey, "_id">, Document {}

const VerificationKeySchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true, uppercase: true },
    productName: { type: String, required: true },
    batchNumber: { type: String, required: true },
    mfgDate: { type: String, default: "JAN 2026" },
    expDate: { type: String, default: "JAN 2029" },
    hplcConcentration: { type: String, default: "250.0 MG / ML" },
    purity: { type: String, default: "99.85%" },
    sealStatus: { type: String, default: "AUTHENTIC & VERIFIED — PASS" },
  },
  {
    timestamps: true,
  }
);

export const VerificationKeyModel: Model<IVerificationKeyDocument> =
  mongoose.models.VerificationKey ||
  mongoose.model<IVerificationKeyDocument>("VerificationKey", VerificationKeySchema);
