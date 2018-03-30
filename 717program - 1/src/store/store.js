import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  applyMiddleware(logger, sagaMiddleware)
);
// ui => action => (middleware) => reducer => store
sagaMiddleware.run(sagas)

export default store