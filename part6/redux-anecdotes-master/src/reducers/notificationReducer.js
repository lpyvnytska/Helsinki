const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.message;
    case 'REMOVE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};
let timeoutId;
export const setNotification = (message, delay) => {
  return async (dispatch) => {
    clearTimeout(timeoutId);
    dispatch({ type: 'SET_NOTIFICATION', data: { message } });
    timeoutId = setTimeout(
      () =>
        dispatch({
          type: 'REMOVE_NOTIFICATION',
        }),
      delay
    );
  };
};

export default notificationReducer;
