import { combineReducers } from 'redux';
import { preventStateRehydration } from 'shoutem.redux';
import { SET_NAVIGATION_INITIALIZED, REFRESH_NAV } from './actions';

const navigationInitialized = (state = false, action) => {
  if (action.type === SET_NAVIGATION_INITIALIZED) {
    return true;
  }

  return state;
};

const refreshNavReducer = (state = false, action) => {
  if (action.type === REFRESH_NAV) {
    return !state;
  }

  return state;
};

const reducer = combineReducers({
  navigationInitialized,
  refreshNavReducer,
});

export default preventStateRehydration(reducer);
