import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_ANECDOT':
      const id = action.data.id;
      return state.map((anec) => (anec.id !== id ? anec : action.data));
    case 'NEW_ANECDOT':
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const voteAnecdot = (data) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.voteAnecdote(data)
    dispatch({
      type: 'VOTE_ANECDOT',
      data: changedAnecdote,
    })
  }
};

export const createAnecdot = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOT',
      data: newAnecdote,
    })
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
