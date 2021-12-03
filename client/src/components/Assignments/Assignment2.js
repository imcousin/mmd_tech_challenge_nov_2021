import React from 'react';

const Assignment2 = () => {
  return (
    <>
      <h1>Assignment 2</h1>
      <form>
        <p>2) Which of the following services does the LTC provide? Select all that apply.</p>
        <label className="inline-flex items-center">
          <input 
            type="checkbox"
            className="form-checkbox"
            value="Technical illustration"
          />
          <span className="ml-2">Technical illustration</span>
        </label>
        <label className="inline-flex items-center">
          <input 
            type="checkbox"
            className="form-checkbox"
            value="Instructional design"
          />
          <span className="ml-2">Instructional design</span>
        </label>
        <label className="inline-flex items-center">
          <input 
            type="checkbox"
            className="form-checkbox"
            value="Financial advice"
          />
          <span className="ml-2">Financial advice</span>
        </label>
        <label className="inline-flex items-center">
          <input 
            type="checkbox"
            className="form-checkbox"
            value="Admission and Registration"
          />
          <span className="ml-2">Admission and Registration</span>
        </label>
        <label className="inline-flex items-center">
          <input 
            type="checkbox"
            className="form-checkbox"
            value="Audio-visual loans"
          />
          <span className="ml-2">Audio-visual loans</span>
        </label>
      </form>
    </>
  )
};

export default Assignment2;
