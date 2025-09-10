const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Content = ({ parts }) => {
  console.log(parts)
  const total = parts[0].exercises+parts[1].exercises+parts[2].exercises
  console.log("sum of exercises are: ", total)


  return (
    <div>
      <div>
        {
        parts.map((part) => {
          return <Part key={part.id} part={part} />
        })
      }
      </div>
      <p>Total Exersice: {total}</p>
    </div>
  )
}


const Part = ({ part }) => {
  console.log("single part", part)
  return <p key={part.id}>{part.name} ex: {part.exercises}</p>

}










export default App


