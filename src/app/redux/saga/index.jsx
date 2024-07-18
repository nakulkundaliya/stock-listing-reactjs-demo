import { all } from 'redux-saga/effects';
import stockSaga from './stockSaga';

export default function* rootSaga() {
  yield all([stockSaga()]);
}
