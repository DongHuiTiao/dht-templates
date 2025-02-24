import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  classId: mongoose.Types.ObjectId;
  account: string;
  password: string;
  lastLoginTime: Date;
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class' },
  account: { type: String, required: true },
  password: { type: String, required: true },
  lastLoginTime: { type: Date, default: Date.now },
  isDisabled: { type: Boolean, default: false },
}, { timestamps: true });


export const StudentModel = mongoose.model<IStudent>('Student', StudentSchema);
