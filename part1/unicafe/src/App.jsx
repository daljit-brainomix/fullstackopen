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

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [averageScore, setAverageScore] = useState(0)
  const [positivePercentage, setPositivePercentage] = useState(0)

  const handleGood = () => {
    const updatedGood = good+1
    const updatedTotal = total+1
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAverageScore(((updatedGood*1)+(neutral*0)+(bad*-1))/3)
    setPositivePercentage((updatedGood/updatedTotal)*100)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral+1
    const updatedTotal = total+1
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)    
    setAverageScore(((good*1)+(updatedNeutral*0)+(bad*-1))/3)
    setPositivePercentage((good/updatedTotal)*100)
  }
  const handleBad = () => {
    const updatedBad = bad+1
    const updatedTotal = total+1
    setBad(updatedBad)
    setTotal(updatedTotal)    
    setAverageScore(((good*1)+(neutral*0)+(updatedBad*-1))/3)    
    setPositivePercentage((good/updatedTotal)*100)
  }

  return (
    <div>
      <h1>Provide feedback.</h1>
      <Button onClick={handleGood} text="Good" /> &nbsp;
      <Button onClick={handleNeutral} text="Neutral" /> &nbsp;
      <Button onClick={handleBad} text="Bad" /> &nbsp;

      <h2>Statistics</h2>
      <DisplayStat feedback={good} text="Total Good" />
      <DisplayStat feedback={neutral} text="Total Neutral" />
      <DisplayStat feedback={bad} text="Total Bad" />
      <DisplayStat feedback={total} text="Total Feedback" />
      
      <DisplayStat feedback={averageScore} text="Average Score" />
      <DisplayStat feedback={positivePercentage+"%"} text="Positive feedback" />

    </div>
  )
}

export default App