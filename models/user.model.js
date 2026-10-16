import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please fill a valid email address."],
    },
    password: { type: String },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  },
  {
    // When a document is sent as JSON: add "id", remove "_id" and "__v",
    // and never send the password back to the client
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
  }
);

export default mongoose.model("User", UserSchema);
