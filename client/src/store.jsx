import { createStore } from 'redux';

const initialState = {
  email: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;
