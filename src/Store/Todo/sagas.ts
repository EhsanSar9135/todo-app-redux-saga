import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { fetchTodoFailure, fetchTodoSuccess } from './actions';
import { FETCH_TODO_REQUEST } from './actionTypes';
import { ITodo } from './types';

const getTodos = () =>
   axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');

// Worker Saga: Fired on FETCH_TODO_REQUEST action

function* fetchTodoSaga() {
   try {
      const { data }: AxiosResponse<ITodo[]> = yield call(getTodos);
      yield put(
         fetchTodoSuccess({
            todos: data,
         })
      );
   } catch (error: unknown) {
      if (error instanceof Error) {
         yield put(
            fetchTodoFailure({
               error: error.message,
            })
         );
      }
   }
}

// Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
// Allows concurrent increments.

function* todoSaga() {
   yield all([takeLatest(FETCH_TODO_REQUEST, fetchTodoSaga)]);
}

export default todoSaga;
