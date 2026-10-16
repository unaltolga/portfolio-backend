import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  {
    // When a document is sent as JSON: add "id", remove "_id" and "__v"
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  }
);

export default mongoose.model("Service", ServiceSchema);
