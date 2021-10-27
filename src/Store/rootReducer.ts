import { combineReducers } from 'redux';

const rootReducer = combineReducers({
   todo: todoReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
