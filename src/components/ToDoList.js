import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteTodo, updateTodo} from '../reducers/TodoSlice';
import {todoRemainingSelector} from '../redux/selector';
import ToDo from './ToDo';

export default function ToDoList() {
  console.log('test - TODOList draw');
  const todoList = useSelector(todoRemainingSelector);
  const dispatch = useDispatch();

  const onCheckBtnClick = useCallback(
    item => {
      dispatch(updateTodo(item.id));
    },
    [dispatch],
  );

  const onDelete = useCallback(
    item => {
      console.log(`test - delete ${item.id}`);
      dispatch(deleteTodo(item.id));
    },
    [dispatch],
  );
  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 20}}
      data={todoList}
      renderItem={({item}) => {
        return (
          <ToDo
            key={item.id}
            name={item.name}
            priority={item.priority}
            isCompleted={item.isCompleted}
            onCheckBtnClick={() => {
              onCheckBtnClick(item);
            }}
            onDelete={() => {
              onDelete(item);
            }}
          />
        );
      }}
      keyExtractor={toDo => toDo.id}
    />
  );
}
