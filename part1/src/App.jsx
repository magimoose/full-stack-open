import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <td> {text}</td>
      <td> {value} </td>
    </>
  )
}
const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tr>
          <StatisticsLine text="good" value={props.good} />
        </tr>
        <tr>
          <StatisticsLine text="neutral" value={props.neutral} />
        </tr>
        <tr>
          <StatisticsLine text="bad" value={props.bad} />
        </tr>
        <tr>
          <StatisticsLine text="all" value={props.all} />
        </tr>
        <tr>
          <StatisticsLine text="average" value={(props.good - props.bad) / props.all} />
        </tr>
        <tr>
          <StatisticsLine text="positive" value={props.good / props.all} /> %
        </tr>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      </div>
    </div>
  )
}

export default App
