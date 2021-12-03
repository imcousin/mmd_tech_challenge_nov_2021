import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  question: {
    type: String,
    required: [true, "Question required"]
  },
  answers: {
    type: Map
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);
export default Assignment;