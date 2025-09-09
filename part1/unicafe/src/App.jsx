import { useState } from 'react'


const StatisticLine = ({ state, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{state}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {

  const total = good + bad + neutral
  const average = (good * 1 + neutral * 0 + bad * (-1)) / total
  const positive = ((good / total) * 100)

  return (
    <div>
      <h1>Statistic</h1>
      {
        total === 0 ? "No feedback given" : (
          <table>
            <tbody>
              <StatisticLine state={good} text={"Good"} />
              <StatisticLine state={bad} text={"Bad"} />
              <StatisticLine state={neutral} text={"Neutral"} />
              <StatisticLine state={average} text={"Average"} />
              <StatisticLine state={`${positive.toFixed(2)} %`} text={"Positive"} />
            </tbody>
          </table>
        )
      }
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>

  )
}

const Controls = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <h1>GIve FeedBack</h1>

      <Button handleClick={handleGood} text={"Good"} />
      <Button handleClick={handleNeutral} text={"Neutral"} />
      <Button handleClick={handleBad} text={"Bad"} />
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>

      <Controls handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App