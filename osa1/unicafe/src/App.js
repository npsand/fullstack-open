import React, { useState } from 'react'


const StatisticLine = ({text, value, unit}) =>{
  return(
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value} {unit}</td>
        </tr>
      </tbody>
    </table>
  )
}


const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * (-1)) / all;
  const positiveFeedback = good / all * 100;
  if(all === 0){
    return(
      <h2>No feedback given</h2>
    )
  }
  return(
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positiveFeedback} unit="%" />
    </div>

  )
}

const Button = ({clickHandle, text}) => {
  return(
    <button onClick={clickHandle}>
      {text}
    </button>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandle={() => setGood(good + 1)} text="good" />
      <Button clickHandle={() => setNeutral(neutral + 1)} text="neutral" />
      <Button clickHandle={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App