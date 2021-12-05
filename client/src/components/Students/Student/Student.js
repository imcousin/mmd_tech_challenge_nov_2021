import React from 'react';
// import jwt from "jsonwebtoken";
import { Link } from 'react-router-dom';

class Student extends React.Component {
  // console.log(assignment);
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <>
        <Link
          className="text-blue-800 no-underline hover:underline"
          to={'/instructor/student_assignments/'+this.props.student._id}
        >
          {this.props.student.email}
        </Link>
      </>
    )
  }
};

export default Student;
