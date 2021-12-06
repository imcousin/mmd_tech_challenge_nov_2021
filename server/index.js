import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user model
import User from "./models/User.js";
import Assignment from "./models/Assignment.js";
import StudentAssignment from "./models/StudentAssignment.js";
import StudentAssignmentMark from "./models/StudentAssignmentMark.js";

// Load env variables
dotenv.config();

// Initial APP
const app = express();

// Setting up bodyParser for sending out requests
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


// REMOTE
const CONNECTION_URL = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@mmd.xmfwp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// DOCKER
// const CONNECTION_URL = "mongodb://mmdadmin:mmdadmin123@mongodb:27017/";

// Set default to 8000 if there is no PORT variable
const PORT = process.env.PORT || 8080;


// Connecting to mongodb
// Set options to suppress warnings in console
mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`MONGODB +++++++++++ Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect. BADDDDDD MONGODB`));




// Routes
app.get('/', async (req, res) => {
  console.log('inside assignments')
  try {
    return res.status(200).json({message: 'server running.'});
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
})

app.post('/users/login', async (req, res) => {
  console.log('/users/login');
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email
  })

  if (!user) {
    console.log('user not in db');
    return res.status(400).json({ status: 'error', error: 'Invalid Login' })
  }

  // Check if user password is correct with db
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  )

  // let isPasswordValid = false;
  // if(req.body.password ===
  //   user.password) {
  //   isPasswordValid = true;
  // }

  if (isPasswordValid) {
    console.log('pw valid');
    const token = jwt.sign({
      id: user._id,
      email: user.email,
      admin: user.admin
    }, 'secret123')

    return res.status(200).json({ user: token })
  }
  else {
    return res.status(400).json({ status: 'error', user: false })
  }
})

app.get('/assignments', async (req, res) => {
  console.log('inside assignments')
  try {
    const assignments = await Assignment.find();
            
    return res.status(200).json(assignments);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
})

app.get('/student_assignments', async (req, res) => {
  console.log('inside student_assignments')
  try {
    const studentAssignments = await StudentAssignment.find({ studentID: req.query.studentID });
            
    return res.status(200).json(studentAssignments);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
})

app.get('/students', async (req, res) => {
  console.log('inside students')
  try {
    const students = await User.find({ admin: false });
    console.log(students);
            
    return res.status(200).json(students);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
})

app.get('/instructors', async (req, res) => {
  console.log('inside instructors')
  try {
    const instructors = await User.find({ admin: true });
    console.log(instructors);
            
    return res.status(200).json(instructors);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
})

app.post('/student_assignments', async (req, res) => {
  console.log('inside student_assignments')
  console.log('student_ass', req.body);
  // ex. body = {"answer1": 'answer'} must be json

  // pass in user email
  const user = await User.findOne({
    _id: req.body.studentID
  })
  if (!user) {
    console.log('user not in db');
    return res.status(400).json({ status: 'error', error: 'Invalid Login' })
  }

  // validate primeminister


  const newStudentAssignment = new StudentAssignment({ 
    "studentID": user._id, 
    "assignmentID": req.body.assignmentID, 
    "answers": req.body.answers })

  try {
    await newStudentAssignment.save();
    return res.status(200).json({saved: true});
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
})



app.post('/student_assignments_mark', async (req, res) => {
  console.log('inside student_assignments_mark', req.body)
  // ex. body = {"answer1": 'answer'} must be json
  
  // pass in user instructor
  const instructor = await User.findOne({
    _id: req.body.instructorID
  })
  if (!instructor) {
    console.log('instructor not in db');
    return res.status(400).json({ status: 'error', error: 'Invalid Instructor' })
  }

  const studentAssignment = await StudentAssignmentMark.findOne({
    studentID: req.body.studentID,
    assignmentID: req.body.assignmentID, 
  })


  // NO duplicate
  if(studentAssignment) {
    return res.status(404).json({ message: 'Student assignment mark already exists.' });
  } else {
    const newStudentAssignmentMark = new StudentAssignmentMark({
      "instructorID": instructor.id, 
      "studentID": req.body.studentID, 
      "assignmentID": req.body.assignmentID, 
      "mark": Number(req.body.mark)
    })
    
    try {
      await newStudentAssignmentMark.save();
      return res.status(200).json({saved: true});
      console.log('5')
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

})




app.post('/seed_users', async (req, res) => {
  console.log('inside seed_users')
  // ex. body = {"answer1": 'answer'} must be json

  // const saltRounds = 10;
  // bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    // Now we can store the password hash in db.

    const newUser = new User({
      "email": "teacher@teacher.com", 
      "password": '123123',
      "admin": true
    })
    
    try {
      await newUser.save();
      return res.status(200).json({saved: true});
      console.log('5')
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }


  // });

  

})

async function checkUser(studentID) {
  const user = await User.findOne({
    _id: studentID
  })
  if (!user) {
    console.log('user not in db');
    return res.status(400).json({ status: 'error', error: 'Invalid User' })
  }
}