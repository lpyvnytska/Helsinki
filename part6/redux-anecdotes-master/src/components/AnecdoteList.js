import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdot } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    if (state.filter.trim() === '') {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anec) =>
      anec.content.toLowerCase().includes(state.filter.trim().toLowerCase())
    );
  });
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(voteAnecdot(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3000));
  };
  return (
    <div>
      {[]
        .concat(anecdotes)
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
