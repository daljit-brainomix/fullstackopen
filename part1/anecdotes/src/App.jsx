import { useState } from 'react'

const Button = (props) => {
  return <>
    <button onClick={props.onClick}>{props.text}</button>
  </>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
     
  const [selected, setSelected] = useState(0)

  const randomAnecdoteHandler = () => {
    const new_selected = Math.floor(Math.random()*anecdotes.length)
    setSelected(new_selected)
  }
  const nextAnecdoteHandler = () => {
    let new_selected = selected+1

    if(new_selected > (anecdotes.length-1)) {
      new_selected = 0
    }
    setSelected(new_selected)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Button text="next anecdote" onClick={nextAnecdoteHandler} /> &nbsp;
      <Button text="random anecdote" onClick={randomAnecdoteHandler} />
    </div>
  )
}

export default App