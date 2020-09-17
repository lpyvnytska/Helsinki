import React from 'react';
import { connect } from 'react-redux';
import { createAnecdot } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

  const addAnecdot = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdot(content);
    props.setNotification('anecdote was created', 3000);
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

export default connect(null, {createAnecdot, setNotification})(AnecdoteForm);
