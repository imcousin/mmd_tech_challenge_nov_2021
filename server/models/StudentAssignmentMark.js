import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StudentAssignmentMarkSchema = new Schema({
  instructorID: {
    type: String,
    required: [true, "Instructor required"]
  },
  studentID: {
    type: String,
    required: [true, "Student required"]
  },
  assignmentID: {
    type: String,
    required: [true, "Assignment required"]
  },
  mark: {
    type: Number,
    required: [true, "Mark required"],
    immutable: true, // cannot be update
    min: 0,
    max: 100,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const StudentAssignmentMark = mongoose.model('StudentAssignmentMark', StudentAssignmentMarkSchema);
export default StudentAssignmentMark;