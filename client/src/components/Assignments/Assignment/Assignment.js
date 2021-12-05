import React from 'react';
import jwt from "jsonwebtoken";
// import { useNavigate } from 'react-router-dom';

class Assignment extends React.Component {
  // console.log(assignment);
  constructor(props) {
    super(props);
    this.state = {
      studentID: '',
      assignmentID: '',
      answers: {
        aniversary: '',
        primeMinister: '',
        ltcServices: [],
      },
      // primeMinister: '',
      // aniversary: 0,
      // ltcServices: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleRadio(value) {
    await this.setState({ 
      answers: { aniversary: value }
    },() => {
      console.log('aniversary state: ', this.state.answers);
    })
  }

  async handleCheckbox(e) {
    let newArray = [...this.state.answers.ltcServices, e.target.value];
    console.log('state services ', this.state.answers.ltcServices)
    console.log('newArray ', newArray)
    if (this.state.answers.ltcServices.includes(e.target.value)) {
      console.log('include value')
      newArray = newArray.filter(service => service !== e.target.value)
      console.log('newArray2 ', newArray)
    }
    await this.setState({
      answers: { ltcServices: newArray }
    }, () => {
      console.log('ltcServices answers state: ', this.state.answers);
    })
  }

   handleChange(e) {
    // validate
    let str = e.target.value;
    let str_split = str.split(/\W+/);
    if (str_split.length === 2) {
      if (str_split.includes("")) {
        // 'a ' == ["a"," "] - will fail
        console.log('bad priminister');
      }
      else {
        // console.log(str_split[0], /^[a-zA-Z]$/.test(str_split[0]))
        // console.log(str_split[1], /^\d+$/.test(str_split[1]))
        if (/^[a-zA-Z]$/.test(str_split[0]) && /^\d+$/.test(str_split[1])) {
          // do something
          console.log('good priminister');
          this.setState({ answers: { primeMinister: e.target.value } }, () =>{
           console.log('primeMinister state: ', this.state.answers);
          })
        }
        else {
          console.log('bad priminister');
        }
      }
    }
    else {
      console.log('bad priminister');
    }
  }

  // Need to fix handle if more than 1 question answered submission; error overwriting whole answer state
  handleSubmit = assignmentID => e => {
    console.log('submit');
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
      }
      else {
        this.setState({ studentID: user.id }, () => {
          // need to run inside/after setstate
          console.log('user state', this.state.studentID);
          this.setState({ assignmentID: assignmentID }, () => {
            // need to run inside/after setstate
            console.log('current state, ', this.state);

            // get the current state
            let state = this.state

            // Need to validate email; add student assignment
            fetch('http://localhost:8080/student_assignments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(state)
            })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error)
            })
          })
        })

      }
    } else {
      // navigate('/')
    }

  }

  render() {
    return (
      <>
        <p>{this.props.index+1}) {this.props.assignment.question}</p>
        <form onSubmit={this.handleSubmit(this.props.assignment._id)}>
          {this.props.assignment.answers_type === 'radio' &&
            Object.keys(this.props.assignment.answers).map((key,i) => {
              return (
                <label className="inline-flex items-center" key={i}>
                  <input 
                    type="radio"
                    id={i}
                    className="form-radio"
                    name="radio"
                    value={this.props.assignment.answers[key]}
                    onChange={() => this.handleRadio(this.props.assignment.answers[key])}
                  />
                  <span className="ml-2">{this.props.assignment.answers[key]}</span>
                </label>
              );
            })
          }
  
          {this.props.assignment.answers_type === 'checkbox' &&
            Object.keys(this.props.assignment.answers).map((key,i) => {
              return (
                <label className="inline-flex items-center" key={i}>
                  <input 
                    type="checkbox"
                    className="form-checkbox"
                    value={this.props.assignment.answers[key]}
                    checked={this.state.checked}
                    onChange={this.handleCheckbox}
                    name={'checkbox_'+key}
                  />
                  <span className="ml-2">{this.props.assignment.answers[key]}</span>
                </label>
              );
            })
          }
  
          {this.props.assignment.answers_type === 'text' &&
            <input 
              type="text"
              className=""
              name="prime_minister"
              value={this.state.primeMinister}
              onChange={this.handleChange}
            />
          } 
          
          <input 
            type="submit"
            className=""
            name="submit"
          />
        </form>
        
      </>
    )
  }
};

export default Assignment;
