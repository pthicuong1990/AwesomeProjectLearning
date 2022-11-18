import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const TODO_APP_STORAGE = 'TODO_APP';

export const fetchTodos = createAsyncThunk('/api/fetchTodos', async () => {
  // const res = await fetch('/api/todos');
  // const data = await res.json();
  // return data.todos;

  console.log(`fetch todo: `);
  const value = await AsyncStorage.getItem(TODO_APP_STORAGE);
  console.log(`fetch todo ss: ${value}`);
  return JSON.parse(value);
});

export const addTodo = createAsyncThunk('/api/addNewTodo', async todo => {
  // const res = await fetch('/api/todos', {
  //   method: 'POST',
  //   body: JSON.stringify(todo),
  // });
  // console.log(`TOdo: ${todo}`);
  // const data = await res.json();
  // console.log(`TOdo: ${JSON.stringify(data)}`);
  // return data.todos;
  const todoListJson = await AsyncStorage.getItem(TODO_APP_STORAGE);

  const todoList = todoListJson ? JSON.parse(todoListJson) : [];

  const newList = [todo, ...todoList];
  console.log(`addTodo ${JSON.stringify(newList)}`);

  await AsyncStorage.setItem(TODO_APP_STORAGE, JSON.stringify(newList));
  return newList;
});

export const updateTodo = createAsyncThunk('/api/updateTodo', async todoId => {
  // const res = await fetch('/api/updateTodo', {
  //   method: 'POST',
  //   data: todoId,
  // });

  // const data = await res.json();
  // console.log(`TOdo: ${JSON.stringify(data)}`);
  // return data.todos;
  const todoListJson = await AsyncStorage.getItem(TODO_APP_STORAGE);
  const todoList = JSON.parse(todoListJson);
  const newList = todoList.map(todo =>
    todo.id === todoId ? {...todo, isCompleted: !todo.isCompleted} : todo,
  );

  await AsyncStorage.setItem(TODO_APP_STORAGE, JSON.stringify(newList));
  return newList;
});

export const deleteTodo = createAsyncThunk('api/deleteTodo', async todoId => {
  const todoListJson = await AsyncStorage.getItem(TODO_APP_STORAGE);
  const todoList = JSON.parse(todoListJson);
  const newList = todoList.filter(todo => todo.id !== todoId);
  await AsyncStorage.setItem(TODO_APP_STORAGE, JSON.stringify(newList));

  return newList;
});

const todoSlice = createSlice({
  name: 'todoList',
  initialState: {status: 'idle', todos: []},
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    todoStatusChange: (state, action) => {
      const todo = state.find(item => item.id === action.payload);
      todo.isCompleted = !todo.isCompleted;
    },
    deleteTodo: (state, action) => {
      state.filter(todo => todo.id !== action.payload);
    },
    loadTodoList: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'idle';

        console.log(`on fetchTodos.fulfilled ${JSON.stringify(state.todos)}`);
        state.todos = action.payload ? action.payload : [];
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        console.log(`on addTodo.fulfilled ${JSON.stringify(state.todos)}`);
        console.log(`on addTodo.fulfilled ${JSON.stringify(state.todos)}`);
        if (action.payload) state.todos = action.payload;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        if (action.payload) state.todos = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        if (action.payload) state.todos = action.payload;
      });
  },
});

export default todoSlice;
