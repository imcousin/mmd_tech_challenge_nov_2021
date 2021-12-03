import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email required"]
  },
  password: {
    type: String,
    required: [true, "Password required"]
  },
  admin: {
    type: Boolean,
    default: false,
    required: [true, "Role required"]
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { collection: 'user' });

const User = mongoose.model('User', UserSchema);
export default User;