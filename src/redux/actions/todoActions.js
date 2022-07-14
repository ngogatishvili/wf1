import axios from 'axios';
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
} from './todoTypes';
import '../../axios';
import { showAlert } from './alertActions';

// pure action creators

const setLoading = () => ({
  type: SET_LOADING,
});

export const getTodoItemsSuccess = (todoData) => ({
  type: GET_TODO_ITEMS_SUCCESS,
  payload: todoData,
});

export const getTodoItemsError = () => ({
  type: GET_TODO_ITEMS_ERROR,
});

export const createTodoSuccess = (newTodoData) => ({
  type: CREATE_TODO_ITEM_SUCCESS,
  payload: newTodoData,
});

export const createTodoError = (error) => ({
  type: CREATE_TODO_ITEM_ERROR,
  payload: error,
});

export const deleteTodoSuccess = (newTodoData) => ({
  type: DELETE_TODO_ITEM_SUCCESS,
  payload: newTodoData,
});

export const deleteTodoError = () => ({
  type: DELETE_TODO_ITEM_ERROR,
});

export const editTodoSuccess = (editTodoData) => ({
  type: EDIT_TODO_ITEM_SUCCESS,
  payload: editTodoData,
});

export const editTodoError = (error) => ({
  type: EDIT_TODO_ITEM_ERROR,
  payload: error,
});

// async action creators

export const getTodoItems = () => (dispatch) => {
  setLoading();
  axios
    .get('/api/v1/todos?page=1')
    .then((response) => {
      const { todos, todoCount } = response.data;
      dispatch(getTodoItemsSuccess({ todos, total: todoCount, current: 1 }));
    })
    .catch(() => {
      dispatch(getTodoItemsError());
    });
};

export const createTodoItem = (todoInput) => (dispatch) => {
  axios
    .post('/api/v1/todos', { ...todoInput })
    .then((response) => {
      const { todoItems, totalRecordsCount, lastPage } = response.data;

      dispatch(
        createTodoSuccess({
          todos: todoItems,
          total: totalRecordsCount,
          current: lastPage,
        }),
      );
    })
    .catch((error) => {
      dispatch(createTodoError({ msg: error.response.data.msg }));
      dispatch(showAlert());
    });
};

export const editTodoItem = (todoId, todoItemUpdates) => (dispatch) => {
  axios
    .patch(`/api/v1/todos/${todoId}`, { ...todoItemUpdates })
    .then((response) => {
      const { todos } = response.data;

      dispatch(editTodoSuccess(todos));
    })
    .catch((err) => {
      dispatch(editTodoError({ msg: err.response.data.msg }));
      dispatch(showAlert());
    });
};

export const deleteTodoItem = (todoId, currentPage, recordPerPage) => (dispatch) => {
  axios
    .delete(`/api/v1/todos/${todoId}`)
    .then((response) => {
      const { todoItems, totalRecordsCount } = response.data;
      const ItemsOnLastPage = todoItems.length % recordPerPage;
      dispatch(
        deleteTodoSuccess({
          todos: todoItems,
          total: totalRecordsCount,
          current:
              ItemsOnLastPage === 0 && currentPage !== 1
                ? currentPage - 1
                : currentPage,
        }),
      );
    })
    .catch((error) => {
      dispatch(deleteTodoError({ msg: error.response.data.msg }));
    });
};

// pagination action

export const fetchTodoItemsByPageNumber = (pageNum) => (dispatch) => {
  axios
    .get(`/api/v1/todos?page=${pageNum}`)
    .then((response) => {
      const { todos, todoCount } = response.data;
      dispatch(
        getTodoItemsSuccess({ todos, total: todoCount, current: pageNum }),
      );
    })
    .catch(() => {
      dispatch(getTodoItemsError());
    });
};
