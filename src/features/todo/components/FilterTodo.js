import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import CheckBox from '../../apptest/components/CheckBox';
import {Priority} from '../../../Constant/Priority';
import {SearchStatus} from '../../../Constant/SearchStatus';
import filtersSlice from '../../../reducers/FilterTodoSlice';
import color from '../../../styles/Colors';
import todoColor from '../../../styles/todoColor';

const styles = StyleSheet.create({
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
  inputTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginEnd: 20,
  },
  textButton: {
    fontSize: 15,
    fontWeight: '400',
    color: color.white,
  },
});

export const FilterTodo = () => {
  const [searchText, setSearchText] = useState('');
  const [searchStatus, setSearchStatus] = useState(SearchStatus.All);
  const [filterPriority, setFilterPriority] = useState([]);
  const dispatch = useDispatch();
  const onSearchStatusChange = (isChecked, status) => {
    if (isChecked) {
      setSearchStatus(status);
      dispatch(filtersSlice.actions.statusFilterChange(status));
    }
  };

  const onTextInputChange = text => {
    setSearchText(text);
    dispatch(filtersSlice.actions.searchFilterChange(text));
  };

  const addButtonStyle = isDisable => {
    const style = [styles.appButton];
    if (isDisable) style.push(styles.buttonDisable);
    return style;
  };

  const onPriorityChange = (priority, isChecked) => {
    let newList = [];
    if (isChecked) {
      newList = [...filterPriority, priority];
    } else {
      newList = filterPriority.filter(item => item !== priority);
    }
    setFilterPriority(newList);
  };
  useEffect(() => {
    dispatch(filtersSlice.actions.priorityFilterChange(filterPriority));
  }, [filterPriority, dispatch]);

  return (
    <View>
      <View style={styles.inputContent}>
        <TextInput
          style={styles.input}
          placeholder="Search task"
          onChangeText={text => onTextInputChange(text)}
          value={searchText}
        />
        <TouchableOpacity style={addButtonStyle(!searchText)}>
          <Text style={styles.textButton}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.inputTitle}>Status:</Text>
        <CheckBox
          size={20}
          title="All"
          isControlOutSide="true"
          checked={searchStatus === SearchStatus.All}
          onPress={isChecked => {
            console.log(`fire onSearchStatusChange${isChecked}`);
            onSearchStatusChange(isChecked, SearchStatus.All);
          }}
        />
        <CheckBox
          size={20}
          title="Completed"
          isControlOutSide="true"
          checked={searchStatus === SearchStatus.Completed}
          onPress={isChecked => {
            console.log(`fire onSearchStatusChange${isChecked}`);
            onSearchStatusChange(isChecked, SearchStatus.Completed);
          }}
        />
        <CheckBox
          size={20}
          title="To do"
          isControlOutSide="true"
          checked={searchStatus === SearchStatus.ToDo}
          onPress={isChecked => {
            console.log(`fire onSearchStatusChange${isChecked}`);
            onSearchStatusChange(isChecked, SearchStatus.ToDo);
          }}
        />
      </View>

      <View style={{flexDirection: 'row', paddingVertical: 10}}>
        <Text style={styles.inputTitle}>Priority:</Text>
        <CheckBox
          size={20}
          title="High"
          onPress={isChecked => onPriorityChange(Priority.H, isChecked)}
        />
        <CheckBox
          size={20}
          title="Medium"
          onPress={isChecked => onPriorityChange(Priority.M, isChecked)}
        />
        <CheckBox
          size={20}
          title="Low"
          onPress={isChecked => onPriorityChange(Priority.L, isChecked)}
        />
      </View>
    </View>
  );
};
