import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  )
}

const DisplayAnecdote = (props) => {
  return (
    <>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </>
  )
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
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  
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

  const voteAnecdoteHandler = (selectedAnecdoteIndex) => {
    const copyVotes = [...votes]
    copyVotes[selectedAnecdoteIndex] += 1
    setVotes(copyVotes)

    let mostVotedTemp = 0
    for(let i=0;i<anecdotes.length;i++) {
      if(votes[i] > votes[mostVotedTemp]) {
        mostVotedTemp = i
      }
    }
    setMostVoted(mostVotedTemp)    
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" onClick={() => voteAnecdoteHandler(selected)} /> &nbsp;
      <Button text="next anecdote" onClick={nextAnecdoteHandler} /> &nbsp;
      <Button text="random anecdote" onClick={randomAnecdoteHandler} />

      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App