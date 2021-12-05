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
        <p>
          <Link
            className="navbar-item"
            to={'/instructor/student_assignments/'+this.props.student._id}
          >
            {this.props.student.email}
          </Link>
        </p>
      </>
    )
  }
};

export default Student;
