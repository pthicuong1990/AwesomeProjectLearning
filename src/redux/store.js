import {configureStore} from '@reduxjs/toolkit';
import filtersSlice from '../reducers/FilterTodoSlice';
import todoSlice from '../reducers/TodoSlice';
import loginSlice from '../features/apptest/redux/loginSlice';

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoSlice.reducer,
    loginData: loginSlice.reducer,
  },
});

export default store;
