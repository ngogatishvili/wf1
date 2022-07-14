import { combineReducers } from 'redux';

import userReducer from './reducers/userReducer';
import todoReducer from './reducers/todoReducer';
import alertReducer from './reducers/alertReducer';

const rootReducer = combineReducers({
  user: userReducer,
  todos: todoReducer,
  alert: alertReducer,
});

export default rootReducer;
