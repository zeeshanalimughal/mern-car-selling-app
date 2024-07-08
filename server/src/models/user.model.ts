import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
  emailExists(email: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  emailExists(email: string): Promise<boolean>;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
  },
  { timestamps: true, versionKey: false }
);

// Encrypt password before saving to database
userSchema.pre<IUser & Document>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if user email already exists
userSchema.statics.emailExists = async function (
  email: string
): Promise<boolean> {
  return await this.exists({ email });
};

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
