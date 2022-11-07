import { combineReducers } from 'redux';

import { specificationReducer as specification } from '../bus/specification/reducer';

export const rootReducer = combineReducers({
  specification
});
