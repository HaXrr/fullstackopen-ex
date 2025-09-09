import { useState } from 'react'


const Statistics = ( { good, bad, neutral } ) => {

  const total = good + bad + neutral
  const average = (good*1 + neutral*0 + bad*(-1))/total
  const positive = ((good/total)*100)

  return(
      <div>
        <h1>Statistic</h1>
        <p>Good: {good}</p>
        <p>Bad: {bad} </p>
        <p>Neutral: {neutral}</p>

        {
          total === 0 ? <p>No feedback yet</p> : <>
            <p>Average: {average.toFixed(2)}</p>
            <p>Positive: {positive.toFixed(2)}%</p></>
        }
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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App