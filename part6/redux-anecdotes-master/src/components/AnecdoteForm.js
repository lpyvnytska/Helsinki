import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdot } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

function AnecdoteForm() {
  const dispatch = useDispatch();
  const addAnecdot = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    dispatch(createAnecdot(content));
    dispatch(setNotification('anecdote was created'));
    setTimeout(() => dispatch(removeNotification()), 3000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdot}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
