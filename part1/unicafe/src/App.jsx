import { useState } from 'react'


const Content = ( { good, bad, neutral } ) => {
  return(
      <div>
        <h1>Statistic</h1>
        <p>Good: {good}</p>
        <p>Bad: {bad} </p>
        <p>Neutral: {neutral}</p>
      </div>
  )
}

const Button = ( {handleClick, text} ) => {
  return(
    <button onClick={handleClick}>{text}</button>

  )
}

const Controls = ({handleGood, handleNeutral, handleBad}) => {
  return(
    <div>
      <h1>GIve FeedBack</h1>

      <Button handleClick={handleGood} text={"Good"}/>
      <Button handleClick={handleNeutral} text={"Neutral"}/>
      <Button handleClick={handleBad} text={"Bad"}/>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }
   const handleNeutral = () => {
    setNeutral(neutral+1)
  }
   const handleBad = () => {
    setBad(bad+1)
  }
  return (
    <div>

      <Controls handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad}   />
      <Content good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App