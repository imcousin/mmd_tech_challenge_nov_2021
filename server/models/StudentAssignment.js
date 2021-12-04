import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AssignmentSchema = new Schema({
  studentID: {
    type: String,
    required: [true, "Student required"]
  },
  answers: {
    type: Map,
    required: [true, "Student required"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);
export default Assignment;