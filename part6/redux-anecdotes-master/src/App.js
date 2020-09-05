import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdot, createAnecdot } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdot(id));
  };

  const addAnecdot = (event) => {
    event.preventDefault();
    const content = event.target.anecdot.value;
    event.target.anecdot.value = '';
    dispatch(createAnecdot(content))
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdot}>
        <div>
          <input name="anecdot" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
