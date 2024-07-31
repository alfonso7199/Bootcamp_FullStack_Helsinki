import { useState } from 'react'

const Button = (props) => {
  const { handleClick, text} = props

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props

  if (all < 1) {
    return <div>No feedback given</div>
  }
  return (
  <table>
    <tbody>
    <StatisticLine text = "good" value = {good}/>
    <StatisticLine text = "neutral" value = {neutral}/>
    <StatisticLine text = "bad" value = {bad}/>
    <StatisticLine text = "all" value = {all}/>
    <StatisticLine text = "average " value = {average}/>
    <StatisticLine text = "positive " value = {positive}/>
    </tbody>
  </table>

  ) 
}

const StatisticLine = ({ text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
const roundToTwo = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = all > 0 ? roundToTwo((good - bad) / all) : 0;
  const positive = all > 0 ? roundToTwo((good / all) * 100) : 0;
  const [allClicks, setAllClicks] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
    setAllClicks(allClicks.concat('G'))
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAllClicks(allClicks.concat('N'))
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAllClicks(allClicks.concat('B'))
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <h1>statistics</h1>
      <Statistics         
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all} 
        average={average} 
        positive={positive}  />    

    </div>
  )
}

export default App