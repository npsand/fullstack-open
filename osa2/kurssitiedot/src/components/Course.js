import React from 'react';

const Header = ({course}) =>{
    return(
      <div>
        <h2>{course}</h2>
      </div>
    );
  }
  
  const Part = ({part, exercises}) =>{
    return(
      <div>
        <p>{part}  {exercises}</p>
      </div>
    )
  }
  
  const Content = ({parts}) =>{
    return(
      <div>
        {parts.map(part => 
            <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  
  const Total = ({parts}) =>{
    const total = parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
    
    return(
      <div>
        <b>total of {total} exercises</b>
      </div>
    )
  }
  
  const Course = ({course}) =>{
    return(
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  

  export default Course;