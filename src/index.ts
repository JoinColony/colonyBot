import { Application } from 'probot' // eslint-disable-line no-unused-vars
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'
import setupListeners from './listeners'

export = (app: Application) => {
  const sagaMiddleware = createSagaMiddleware()

  /*
   * Redux is used for sagas and also any data persistence, later we could use
   * redux-persist also.
   */
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

  sagaMiddleware.run(rootSaga)
  setupListeners(app, store.dispatch)

  // app.on('issues.opened', async (context) => {
  //   const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
  //   await context.github.issues.createComment(issueComment)
  // })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
