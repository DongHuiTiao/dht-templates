import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string;
  isShow: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema: Schema = new Schema({
  name: { type: String, required: true },
  isShow: { type: Boolean, default: false },
}, { timestamps: true });


export const ClassModel = mongoose.model<IClass>('Class', ClassSchema);
