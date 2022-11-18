export const NetWorkAction = {
  GetData: 'GET_DATA_REQUEST',
  GetDataSuccess: 'GET_DATA_SUCCESS',
  GetDataError: 'GET_DATA_ERROR',
};

export const initState = {
  loading: false,
  data: null,
  error: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case NetWorkAction.GetData:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case NetWorkAction.GetDataSuccess:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case NetWorkAction.GetDataError:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.data,
      };
    default:
      return state;
  }
};
