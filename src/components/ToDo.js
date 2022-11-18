import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Logo from '../asset/icon/checkBoxSelected.svg';
import LogoUnCheck from '../asset/icon/checkBoxUnselected.svg';
import {Priority} from '../Constant/Priority';
import todoColor from '../styles/todoColor';

const styleBase = StyleSheet.create({
  textTitle: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
    alignContent: 'center',
    textAlignVertical: 'center',
  },
});

const styles = StyleSheet.create({
  tinyLogo: {
    alignContent: 'flex-end',
  },
  checkBox: {
    alignContent: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  button: {
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: todoColor.borderColor,
    backgroundColor: todoColor.background,
  },
  deleteText: {
    fontSize: 15,
    fontWeight: '300',
    flex: 1,
    alignContent: 'center',
  },
  taskTitle: {
    ...styleBase.textTitle,
  },
  taskTitleChecked: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  priorityTag: {
    height: 20,
    includeFontPadding: false,
    backgroundColor: todoColor.orangeColor,
    color: todoColor.white,
    padding: 3,
    textAlign: 'center',
    fontSize: 11,
    borderRadius: 7,
    textAlignVertical: 'center',
  },
});

function ChekBox(isCompleted) {
  return isCompleted ? (
    <Logo width={25} height={25} />
  ) : (
    <LogoUnCheck width={25} height={25} />
  );
}

function ToDo({name, priority, isCompleted, onCheckBtnClick, onDelete}) {
  console.log('Dra TODO', name);
  const titleStyles = [styles.taskTitle];

  const [isChecked, setChecked] = useState(isCompleted);
  const onCheckBoxClick = () => {
    setChecked(!isChecked);
    onCheckBtnClick();
  };

  if (isChecked) titleStyles.push(styles.taskTitleChecked);
  const priorityStyle = priority => {
    const style = [styles.priorityTag];
    switch (priority) {
      case Priority.L:
        style.push({
          backgroundColor: todoColor.greenColor,
        });
        break;
      case Priority.H:
        style.push({
          backgroundColor: todoColor.redColor,
        });
        break;
      default:
        style.push({
          backgroundColor: todoColor.orangeColor,
        });
    }
    return style;
  };
  return (
    <TouchableOpacity style={styles.button} onPress={onCheckBoxClick}>
      <TouchableOpacity style={styles.checkBox} onPress={onCheckBoxClick}>
        {ChekBox(isChecked)}
      </TouchableOpacity>
      <Text style={titleStyles}>{name}</Text>
      <View style={{justifyContent: 'space-between'}}>
        <Text style={priorityStyle(priority)}>{priority}</Text>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default ToDo;
