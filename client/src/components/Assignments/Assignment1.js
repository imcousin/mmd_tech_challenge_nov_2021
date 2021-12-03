import React from 'react';

const Assignment1 = () => {
  return (
    <>
      <h1>Assignment 1</h1>
      <form>
        <p>1) When was BCIT's 50<sup>th</sup> anniversary celebration?</p>
        <label className="inline-flex items-center">
          <input 
            type="radio"
            className="form-radio"
            name="radio"
            value="2016"
          />
          <span className="ml-2">2016</span>
        </label>
        <label className="inline-flex items-center">
          <input 
            type="radio"
            className="form-radio"
            name="radio"
            value="1967"
          />
          <span className="ml-2">1967</span>
        </label>
        <label className="inline-flex items-center">
          <input 
            type="radio"
            className="form-radio"
            name="radio"
            value="2017"
          />
          <span className="ml-2">2017</span>
        </label>
        <label className="inline-flex items-center">
          <input 
            type="radio"
            className="form-radio"
            name="radio"
            value="1987"
          />
          <span className="ml-2">1987</span>
        </label>
      </form>
    </>
  )
};

export default Assignment1;
