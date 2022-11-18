const types = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};
export const actionCreators = {
  loading: () => ({type: types.LOADING}),
  failure: () => ({type: types.FAILURE}),
  success: payload => ({type: types.SUCCESS, payload}),
};

export const initalState = {
  loading: false,
  error: false,
  data: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case types.LOADING:
      return {...state, loading: true, error: false};
    case types.SUCCESS:
      return {loading: false, error: false, data: action.payload};
    case types.FAILURE:
      return {...state, loading: false, error: true};
    default:
      return state;
  }
}
