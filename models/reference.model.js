import mongoose from "mongoose";

const ReferenceSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    testimonial: { type: String, trim: true },
    position: { type: String, trim: true },
    company: { type: String, trim: true },
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

export default mongoose.model("Reference", ReferenceSchema);
