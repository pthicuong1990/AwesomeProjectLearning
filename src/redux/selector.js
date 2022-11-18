import {createSelector} from 'reselect';
import {SearchStatus} from '../Constant/SearchStatus';

export const searchTextSelector = state => state.filters.search;
export const todoListSelector = state => state.todoList.todos;
export const filterStatusSelector = state => state.filters.status;
export const todoPrioritySelector = state => state.filters.priorities;

export const todoRemainingSelector = createSelector(
  todoListSelector,
  searchTextSelector,
  filterStatusSelector,
  todoPrioritySelector,
  (todoList, searchText, status, priorities) => {
    console.log(
      `todoList: ${JSON.stringify(
        todoList,
      )},searchText: ${searchText}-status: ${status}-priorities: ${priorities}`,
    );
    const todoRemaining = todoList.filter(todo => {
      const todoStatus = todo.isCompleted
        ? SearchStatus.Completed
        : SearchStatus.ToDo;

      return (
        todo.name.toLowerCase().includes(searchText) &&
        (status === SearchStatus.All || todoStatus === status) &&
        (!priorities.length || priorities.includes(todo.priority))
      );
    });

    console.log(`Remaining: ${todoRemaining}`);
    return todoRemaining;
  },
);
