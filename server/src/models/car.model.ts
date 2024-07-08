import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICar extends Document {
  carModel: string;
  price: number;
  phone: string;
  city: string;
  copies: number;
  user: string;
  pictures: string[];
}

const carSchema: Schema = new Schema(
  {
    carModel: {
      type: String,
    },
    price: {
      type: Number,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    copies: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pictures: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false }
);

const Car = mongoose.model<ICar>("Car", carSchema);

export default Car;
