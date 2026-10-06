import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    memberCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default model('Team', teamSchema);