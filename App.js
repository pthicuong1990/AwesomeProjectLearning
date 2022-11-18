/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useState} from 'react';

import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ToDoList from './src/components/ToDoList';
import color from './src/styles/Colors';

const TODO_APP_STORAGE = 'TODO_APP';

export const setItem = async (item, value) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (error) {
    console.log('SetItem error ', error);
    return null;
  }
};
export const getItem = async item => {
  try {
    const value = await AsyncStorage.getItem(item);
    return JSON.parse(value);
  } catch (error) {
    console.log(`get 1 null}`, error);
    return null;
  }
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 8,
  };
  const [todoList, setToDoList] = useState([]);
  const [textInput, setTextInput] = useState('');
  const onTextInputChange = useCallback(text => {
    console.log(`TextValue ${text}`);
    setTextInput(text);
  }, []);

  const onAddButtonClick = useCallback(
    e => {
      setToDoList([
        {id: todoList.length + 1, name: textInput, isCompleted: false},
        ...todoList,
      ]);

      setTextInput('');
    },
    [textInput, todoList],
  );

  const onCheckBtnClick = useCallback(id => {
    setToDoList(prevState =>
      prevState.map(todo =>
        todo.id == id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    );
  }, []);

  const onDelete = useCallback(id => {
    setToDoList(prevState => prevState.filter(todo => todo.id !== id));
  }, []);

  useEffect(() => {
    getItem(TODO_APP_STORAGE).then(value => {
      if (value) setToDoList(value);
    });
  }, []);

  useEffect(() => {
    if (todoList) {
      console.log('Save to database');
      setItem(TODO_APP_STORAGE, todoList);
    }
  }, [todoList]);

  const addButtonStyle = [styles.appButton];
  if (!textInput) addButtonStyle.push(styles.buttonDisable);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Text style={styles.sectionTitle}>To Do List</Text>
      <View style={styles.inputContent}>
        <TextInput
          style={styles.input}
          placeholder="Task"
          onChangeText={text => onTextInputChange(text)}
          value={textInput}
        />
        <Pressable
          style={addButtonStyle}
          disabled={!textInput}
          onPress={onAddButtonClick}>
          <Text style={styles.textButton}>ADD</Text>
        </Pressable>
      </View>
      <ToDoList
        todoList={todoList}
        onCheckBtnClick={onCheckBtnClick}
        onDelete={onDelete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContent: {
    flexDirection: 'row',
    height: 40,
    borderWidth: 1,
    marginVertical: 16,
    borderRadius: 5,
  },
  input: {
    borderColor: color.border,
    padding: 10,
    flex: 1,
  },
  appButton: {
    width: 50,
    height: 38,
    borderBottomEndRadius: 5,
    borderTopEndRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: color.secondary,
  },
  buttonDisable: {
    backgroundColor: color.disableButton,
  },
  textButton: {
    fontSize: 15,
    fontWeight: '400',
    color: color.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  separator: {
    marginVertical: 8,
    borderRadius: 5,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
