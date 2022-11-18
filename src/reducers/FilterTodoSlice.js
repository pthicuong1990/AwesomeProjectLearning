import {createSlice} from '@reduxjs/toolkit';
import {SearchStatus} from '../Constant/SearchStatus';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    status: SearchStatus.All,
    priorities: [],
  },
  reducers: {
    //=>{type:'filters/searchFilterChange'}
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    priorityFilterChange: (state, action) => {
      state.priorities = action.payload;
    },
  },
});
export default filtersSlice;
