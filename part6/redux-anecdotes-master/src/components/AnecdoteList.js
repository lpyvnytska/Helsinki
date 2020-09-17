import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdot } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdot(anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 3000);
  };
  
  return (
    <div>
      {[]
        .concat(props.anecdotes)
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
};

const mapDispatchToProps = {
  voteAnecdot,
  setNotification,
};

const mapStateToProps = (state) => {
  if (state.filter.trim() === '') {
    return { anecdotes: state.anecdotes };
  }
  return {
    anecdotes: state.anecdotes.filter((anec) =>
      anec.content.toLowerCase().includes(state.filter.trim().toLowerCase())
    ),
  };
};

const ConnedtedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnedtedAnecdoteList;
