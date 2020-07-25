import React, { useState, Fragment } from 'react'
import ReactDOM from 'react-dom'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Vote = ({point}) => {
  if (point===0) {
    return null
  } else if (point===1){
    return (
      <p>has 1 vote</p>
    )
  }
  return (
    <p>has {point} votes</p>
  )
}

const ShowAnecdote = ({ title, anecdote, vote }) => {
  return (
    <Fragment>
      <h2>{title}</h2>
      {anecdote}
      <br />
      <Vote point={vote} />
    </Fragment>
  )
}
    
const MostVotedAnecdote = ({anecdotes, points}) => {
  function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    if (max===0) return -1;
    return maxIndex;
}

  let indexMax = indexOfMax(points)
  if (indexMax===-1) {
    return null
  }

  return (
    <ShowAnecdote title='Anecdote with most votes' 
    anecdote={anecdotes[indexMax]} vote={points[indexMax]}/>
  )
}

const App = ({anecdotes}) => {
  const vote = (index) => () => {
    const newPoints = [...points]
    newPoints[index]++ 
    setPoints(newPoints)
  }

  let index = getRandomInt(anecdotes.length-1)
  const [selected, setSelected] = useState(index)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  return (
    <div>
      <ShowAnecdote title='Anecdote of the day' 
          anecdote={anecdotes[selected]} vote={points[selected]}/>
      <button onClick={vote(selected)}>vote</button>
      <button onClick={()=>{setSelected(getRandomInt(anecdotes.length-1))}}>next anecdote</button>
      <MostVotedAnecdote anecdotes={anecdotes} points={points}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)