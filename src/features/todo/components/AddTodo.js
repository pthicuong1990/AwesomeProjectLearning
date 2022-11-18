import React, {useCallback, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Priority} from '../../../Constant/Priority';
import todoColor from '../../../styles/todoColor';
import color from '../../../styles/Colors';
import {addTodo} from '../../../reducers/TodoSlice';

const styles = StyleSheet.create({
  borderButton: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: todoColor.borderColor,
    marginEnd: 8,
  },
  textButton: {
    fontSize: 15,
    fontWeight: '400',
    color: color.white,
  },
  inputContent: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: color.border,
    fontSize: 16,
    padding: 8,
    fontWeight: '300',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderEndWidth: 0,
    flex: 1,
  },
  appButton: {
    borderBottomEndRadius: 5,
    borderTopEndRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: todoColor.secondaryColor,
  },
  buttonDisable: {
    backgroundColor: todoColor.disableColor,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginEnd: 20,
  },
});
const priorityStyle = (priority, isSelected) => {
  const style = [styles.borderButton];

  switch (priority) {
    case Priority.L:
      if (isSelected) {
        style.push({
          backgroundColor: todoColor.greenColor,
          borderColor: todoColor.greenColor,
        });
      } else {
        style.push({
          borderColor: todoColor.greenColor,
        });
      }
      break;
    case Priority.H:
      if (isSelected) {
        style.push({
          backgroundColor: todoColor.redColor,
          borderColor: todoColor.redColor,
        });
      } else {
        style.push({
          borderColor: todoColor.redColor,
        });
      }
      break;
    default:
      if (isSelected) {
        style.push({
          backgroundColor: todoColor.orangeColor,
          borderColor: todoColor.orangeColor,
        });
      } else {
        style.push({
          borderColor: todoColor.orangeColor,
        });
      }
  }
  return style;
};

export const AddTodo = props => {
  const [textInput, setTextInput] = useState('');
  const [priorityAdd, setPriority] = useState(Priority.M);
  const [isShowAddView, setIsShowAddView] = useState(true);

  const onPrioritySelected = priority => {
    console.log(priority);
    setPriority(priority);
  };

  const onTextInputChange = useCallback(text => {
    console.log(`TextValue ${text}`);
    setTextInput(text);
  }, []);
  const dispatch = useDispatch();
  const onAddButtonClick = useCallback(() => {
    console.log('on dispatch');
    dispatch(
      addTodo({
        id: uuidv4(),
        name: textInput,
        isCompleted: false,
        priority: priorityAdd,
      }),
    );

    setTextInput('');
    setPriority(Priority.M);
  }, [textInput, priorityAdd, dispatch]);

  const addButtonStyle = isDisable => {
    const style = [styles.appButton];
    if (isDisable) style.push(styles.buttonDisable);
    return style;
  };
  return (
    <View {...props}>
      <Pressable
        style={{paddingBottom: 10}}
        onPress={() => {
          setIsShowAddView(!isShowAddView);
        }}>
        <Text style={styles.inputTitle}>Add Task</Text>
      </Pressable>
      {isShowAddView ? (
        <View>
          <View style={styles.inputContent}>
            <TextInput
              style={styles.input}
              placeholder="Task"
              onChangeText={text => onTextInputChange(text)}
              value={textInput}
            />
            <TouchableOpacity
              style={addButtonStyle(!textInput)}
              disabled={!textInput}
              onPress={onAddButtonClick}>
              <Text style={styles.textButton}>ADD</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <TouchableOpacity
              style={priorityStyle(Priority.L, priorityAdd === Priority.L)}
              onPress={() => onPrioritySelected(Priority.L)}>
              <Text
                style={{
                  ...styles.textButton,
                  ...(priorityAdd !== Priority.L ? {color: color.text} : null),
                }}>
                Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={priorityStyle(Priority.M, priorityAdd === Priority.M)}
              onPress={() => onPrioritySelected(Priority.M)}>
              <Text
                style={{
                  ...styles.textButton,
                  ...(priorityAdd !== Priority.M ? {color: color.text} : null),
                }}>
                Medium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={priorityStyle(Priority.H, priorityAdd === Priority.H)}
              onPress={() => onPrioritySelected(Priority.H)}>
              <Text
                style={{
                  ...styles.textButton,
                  ...(priorityAdd !== Priority.H ? {color: color.text} : null),
                }}>
                High
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
