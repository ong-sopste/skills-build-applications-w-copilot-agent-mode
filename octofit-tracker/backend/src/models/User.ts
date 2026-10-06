import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fitnessGoal: { type: String, required: true },
    team: { type: String, default: null },
  },
  { timestamps: true },
);

export default model('User', userSchema);