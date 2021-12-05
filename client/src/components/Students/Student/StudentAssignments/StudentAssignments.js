import React from 'react';
import jwt from "jsonwebtoken";
import { Link } from 'react-router-dom';

class StudentAssignments extends React.Component {
  // console.log(assignment);
  constructor(props) {
    super(props);
    this.state = {
      assignments: [],
      mark: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    let studentID = window.location.pathname.split('/').pop();

    // Need to validate email; add student assignment
    fetch('http://localhost:8080/student_assignments?' + new URLSearchParams({
      studentID: studentID}), {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({ assignments: data }, () => {
        console.log(this.state.assignments);
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }


  handleChange = (e) => {
    let mark = e.target.value;

    if (isNaN(mark)) {
      mark = 0;
    }
    else if (mark < 0){
      mark = 0;
    }
    else if (mark > 100) {
      mark = 100;
    }
    this.setState({ mark: mark }, () =>{
      console.log('mark state: ', this.state.mark);
     })
  }


  handleSubmit = studentAssignment => e => {
    console.log('submit');
    console.log('studentAssignmentID ', studentAssignment);
    console.log('mark ', e.target.value);
    e.preventDefault();

    const token = localStorage.getItem('token');
    // const navigate = useNavigate();
    if (token) {
      const user = jwt.decode(token)
      console.log('user assment: ', user);
      if (!user) {
        console.log('no user')
        // user does not exists
        localStorage.removeItem('token')
        // return to login
        // navigate('/')
      } else {
        // Need to validate email; add student assignment
        fetch('http://localhost:8080/student_assignments_mark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            instructorID: user.id, 
            studentID: studentAssignment.studentID, 
            assignmentID: studentAssignment.assignmentID, 
            mark: this.state.mark
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error)
        })
      }
    } else {
      // navigate('/')
    }

  }


  render() {
    return (
      <div className="w-full max-w-xl mx-auto">
        <p className="mb-5">
          <Link
            className="text-blue-800 no-underline hover:underline"
            to="/instructor"
          >
            &lt; Back to Students
          </Link>
        </p>
        <h1 className="text-3xl font-bold mb-8">Student Assignments</h1>
          {this.state.assignments.map((assignment, i) => {
            return(
              Object.keys(assignment.answers).map((key,i) => {
                return (
                  <form key={i} onSubmit={this.handleSubmit(assignment)} className="px-2 py-4 border-b-2">
                    <h2>Assignment Question id: {assignment.assignmentID}</h2>
                    <h3>Answers:</h3>
                    {(typeof assignment.answers[key] === 'string') &&
                      <p className="text-xl font-bold">{assignment.answers[key]}</p>
                    }
                    {Array.isArray(assignment.answers[key]) &&
                      <ul className="list-disc list-inside text-black-600 py-2 text-xl font-bold">
                        {assignment.answers[key].map((data,i)=> {
                          return (
                            <li key={i}>{data}</li>
                          )
                        })}
                      </ul>
                    }
                    <br />
                    <input 
                      type="number"
                      name="mark"
                      min="0"
                      max="100"
                      value={this.state.mark} 
                      onChange={this.handleChange} 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <br />
                    <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3 w-full" value="Mark" />
                  </form>
                );
              })
            )
          })}
      </div>
    )
  }
};

export default StudentAssignments;
