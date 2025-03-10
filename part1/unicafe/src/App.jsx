import { useState } from 'react'


const Button = (props) => {
  return <>
    <button onClick={props.onClick}>{props.text}</button>
  </>
}
const ShowStat = (props) => {
  return <>
    <p><strong>{props.text}:</strong> {props.feedback}</p>
  </>
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
      <h1>Provide feedback.</h1>
      <Button onClick={handleGood} text="Good" /> &nbsp;
      <Button onClick={handleNeutral} text="Neutral" /> &nbsp;
      <Button onClick={handleBad} text="Bad" /> &nbsp;

      <h2>Statistics</h2>
      <ShowStat feedback={good} text="Good" />
      <ShowStat feedback={neutral} text="Neutral" />
      <ShowStat feedback={bad} text="Bad" />
    </div>
  )
}

export default App

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
