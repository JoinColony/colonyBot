import { SagaIterator } from 'redux-saga'
import { takeEvery } from 'redux-saga/effects'

import ACTIONS from '../actions';
import { githubPreInstall, githubInstall } from './github'

function* rootSaga(): SagaIterator {
  yield takeEvery(ACTIONS.GITHUB_PRE_INSTALL, githubPreInstall)
  yield takeEvery(ACTIONS.GITHUB_INSTALL, githubInstall)
}

export default rootSaga
