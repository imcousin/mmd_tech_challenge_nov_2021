import React from 'react';

class Assignment extends React.Component {
  // console.log(assignment);
  constructor(props) {
    super(props);
    this.state = {
      primeMinister: '',
      aniversary: 0,
      student_email: '',
      question: '',
      ltcServices: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleRadio(value) {
    await this.setState({
      aniversary: value
    })
    console.log('aniversary state: ', this.state.aniversary);
  }

  async handleCheckbox(e) {
    let newArray = [...this.state.ltcServices, e.target.value];
    if (this.state.ltcServices.includes(e.target.value)) {
      newArray = newArray.filter(service => service !== e.target.value)
    }
    await this.setState({
      ltcServices: newArray
    });
    console.log('ltcServices state: ', this.state.ltcServices);
  }

  async handleChange(e) {
    await this.setState({ primeMinister: e.target.value })
    console.log('primeMinister state: ', this.state.primeMinister);
  }

  handleSubmit(e) {
    console.log('submit');
    console.log(this.state);
    let state = this.state
    e.preventDefault();

    // Need to validate email
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
  }

  render() {
    return (
      <>
        <p>{this.props.index+1}) {this.props.assignment.question}</p>
        <form action={'/question/'+(this.props.index+1)} onSubmit={this.handleSubmit}>
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
