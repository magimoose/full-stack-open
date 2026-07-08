import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ]

  const addVotes = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVotes(copy)
    console.log('given one vote to ', selected)
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 })
  console.log(Object.values(votes))
  const max = () => {
    console.log('max called')
    return Object.keys(votes).reduce((lead, current) =>
      votes[current] > votes[lead] ? current : lead,
    )
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>next anecdote</button>
      <button onClick={addVotes}>vote</button>
      <h2>Anecdote with the most votes</h2>
      {anecdotes[max()]}
      <br />
      has {votes[max()]} votes
    </div>
  )
}

export default App
