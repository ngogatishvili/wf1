import {
  SET_LOADING,
  GET_TODO_ITEMS_SUCCESS,
  GET_TODO_ITEMS_ERROR,
  CREATE_TODO_ITEM_SUCCESS,
  CREATE_TODO_ITEM_ERROR,
  EDIT_TODO_ITEM_SUCCESS,
  EDIT_TODO_ITEM_ERROR,
  DELETE_TODO_ITEM_SUCCESS,
  DELETE_TODO_ITEM_ERROR,
  ADD_TODO_ACTION,
  DELETE_TODO_ACTION,
  EDIT_TODO_ACTION,
  CLEAR_ALERT,
} from '../actions/todoTypes';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  recordPerPage: 5,
  todoItems: [],
  totalCount: 0,
  currentPage: 1,
  lastAction: '',
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TODO_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: false,
        alertText: '',
        todoItems: action.payload.todos,
        totalCount: action.payload.total,
        currentPage: action.payload.current,
        lastAction: '',
      };
    case GET_TODO_ITEMS_ERROR:
      return {
        ...state,
        showAlert: true,
        alertText: 'could not fetch data',
        todoItems: [],
      };
    case CREATE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        showAlert: false,
        alertText: '',
        todoItems: action.payload.todos,
        totalCount: action.payload.total,
        currentPage: action.payload.current,
        lastAction: ADD_TODO_ACTION,
      };
    case CREATE_TODO_ITEM_ERROR:
      return {
        ...state,
        showAlert: true,
        alertText: action.payload.msg,
      };
    case EDIT_TODO_ITEM_SUCCESS:
      return {
        ...state,
        editAlert: false,
        editAlertText: '',
        todoItems: action.payload,
        lastAction: EDIT_TODO_ACTION,
      };
    case EDIT_TODO_ITEM_ERROR:
      return {
        ...state,
        editAlert: true,
        editAlertText: action.payload.msg,
      };
    case DELETE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        showAlert: false,
        alertText: '',
        todoItems: action.payload.todos,
        totalCount: action.payload.total,
        currentPage: action.payload.current,
        lastAction: DELETE_TODO_ACTION,
      };
    case DELETE_TODO_ITEM_ERROR:
      return {
        ...state,
        showAlert: true,
        alertText: action.payload.msg,
        todoItems: [],
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: '',
        editAlert: false,
      };

    default:
      return state;
  }
};

export default todoReducer;
