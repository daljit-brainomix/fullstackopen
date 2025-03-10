import { useState } from 'react'

const Button = (props) => {
  return <>
    <button onClick={props.onClick}>{props.text}</button>
  </>
}

const DisplayStat = (props) => {
  return <>
    <p><strong>{props.text}:</strong> {props.feedback}</p>
  </>
}

const Statistics = (props) => {
  
  const total = props.good + props.neutral + props.bad 
  const averageScore = ((props.good*1)+(props.neutral*0)+(props.bad*-1))/3
  
  let positivePercentage = 0  
  if(total > 0) {
    positivePercentage = (props.good/total)*100
  }

  if(total < 1) 
  {
    return <>
      <p>No feedback given.</p>
    </>
  } 
  else 
  {
    return <>
      <DisplayStat feedback={props.good} text="Good" />
      <DisplayStat feedback={props.neutral} text="Neutral" />
      <DisplayStat feedback={props.bad} text="Bad" />

      <DisplayStat feedback={total} text="Feedback" />
      
      <DisplayStat feedback={averageScore} text="Average Score" />
      <DisplayStat feedback={positivePercentage+"%"} text="Positive feedback" />    
    </>
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updatedGood = good+1
    setGood(updatedGood)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral+1
    setNeutral(updatedNeutral)
  }
  const handleBad = () => {
    const updatedBad = bad+1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>Provide feedback.</h1>
      <Button onClick={handleGood} text="Good" /> &nbsp;
      <Button onClick={handleNeutral} text="Neutral" /> &nbsp;
      <Button onClick={handleBad} text="Bad" /> &nbsp;

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App