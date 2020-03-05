import { LOGIN, LOGOUT } from './types';

const initialState = {
  token: null,
};

const reducer = (state: { token: string } = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { token: action.payload };

    case LOGOUT:
      return { token: null };

    default:
      return state;
  }
};

export default reducer;
