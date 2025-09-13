import React,{useState} from 'react'

const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const [counter,setCounter] = useState(0)
console.log('rendering with counter value', counter)

const handleIncrement = ()=>{
    console.log('clicked the button')
    setCounter(counter + 1) //this is not working as expected
} 

const handleDecrement = ()=>{
  console.log('decrementing the button')
  setCounter(counter - 1)
}
const handleZero = ()=>{
  console.log('resetting the button')
  setCounter(0)
}
  return (
    <div>
      <Header name={course.name} />
      <Content 
      course={course}
      
      />
      
      <Total total={ course.parts[0].exercises + course.parts[1].exercises+ course.parts[2].exercises}/>
      <p>{counter}</p>
      <Button handleClick={handleDecrement} text='minus' />
      <Button handleClick={handleIncrement} text='plus' />
      <Button handleClick={handleZero} text='zero' />
     
    </div>
  )
}

export default App

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

const Header = (props)=>{
    return(
      <>
        <h1> {props.name} </h1>
      </>
    )
}

const Content = (props)=>{
    return(
      <div>
      <p>
        {props.course.parts[0].name} {props.course.parts[0].exercises}
      </p>
      <p>
        {props.course.parts[1].name} {props.course.parts[1].exercises}
      </p>
      <p>
        {props.course.parts[2].name} {props.course.parts[2].exercises}
      </p>
      </div>
    )
}

const Total = (props)=>{
    return(
      
        <p>Number of exercises {props.total}</p>
      
    )
}