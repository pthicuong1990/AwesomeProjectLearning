/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import 'react-native-get-random-values';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ToDoList from '../../components/ToDoList';
import todoColor from '../../styles/todoColor';
import {AddTodo} from './components/AddTodo';
import {FilterTodo} from './components/FilterTodo';
import {fetchTodos} from '../../reducers/TodoSlice';

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    margin: 20,
  },
});

const ListOfTask = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? todoColor.background : Colors.lighter,
    flex: 1,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`fetch todo: `);
    dispatch(fetchTodos());
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{paddingHorizontal: 15, flex: 1, paddingTop: 10}}>
        <FilterTodo />
        <ToDoList />
      </View>

      <AddTodo
        style={{
          backgroundColor: todoColor.background,
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          padding: 15,
          paddingTop: 20,
        }}
      />
    </SafeAreaView>
  );
};

export default ListOfTask;
