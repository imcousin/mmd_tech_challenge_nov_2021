import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StudentAssignmentSchema = new Schema({
  studentID: {
    type: String,
    required: [true, "Student required"]
  },
  assignmentID: {
    type: String,
    required: [true, "Assignment required"]
  },
  answers: {
    type: Map
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const StudentAssignment = mongoose.model('StudentAssignment', StudentAssignmentSchema);
export default StudentAssignment;