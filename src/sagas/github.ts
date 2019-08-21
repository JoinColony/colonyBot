import { SagaIterator } from 'redux-saga'
import { call, put, select, getContext } from 'redux-saga/effects'
import nanoid from 'nanoid'
import { Application } from 'probot'

import ACTIONS, { GITHUB_PRE_INSTALL, GITHUB_INSTALL, GITHUB_PRE_INSTALL_SUCCESS, GITHUB_INSTALL_SUCCESS } from '../actions'

const GITHUB_APP_NAME = process.env.APP_NAME

export function* githubPreInstall({ req, res }: GITHUB_PRE_INSTALL): SagaIterator {
  const { colonyAddress } = req.query

  // We use a random string to keep track of the user with the GitHub install
  const stateId = nanoid()

  if (!colonyAddress) {
    // Error to the user if no colonyAddress
    yield call([res, res.status], 400)
    yield call([res, res.send], 'Bad request')
    return
  }

  // Update state
  yield put<GITHUB_PRE_INSTALL_SUCCESS>({
    type: ACTIONS.GITHUB_PRE_INSTALL_SUCCESS,
    colonyAddress,
    stateId,
  })

  // Forward user on to install the app on GitHub
  yield call([res, res.location],
    `https://github.com/apps/${
      GITHUB_APP_NAME
    }/installations/new?state=${
      stateId
    }`
  )
  yield call([res, res.status],
    302
  )
  yield call([res, res.send])
  
}

export function* githubInstall({ req, res }: GITHUB_INSTALL): SagaIterator {
  const {
    state: stateId,
    installation_id: installationId,
    // setup_action: setupAction,
  } = req.query

  // Get the repos for this app installation
  const app: Application = yield getContext('app')
  const gh = yield call([app, app.auth], installationId)
  const { data: reposData } = yield call([gh.apps, gh.apps.listRepos])

  // Check to make sure GitHub gave us the data we wanted
  if (!reposData) {
    yield call([res, res.status], 500)
    yield call([res, res.send], 'Bad GitHub reponse')
    return
  }

  // Map the repos to just their names
  const { repositories: repos } = reposData
  const repoNames = repos.map(
    ({ full_name }: { full_name: string }) => full_name,
  )

  // Get the colonyAddress based on the state variable from GitHub
  const colonyAddress = yield select(
    ({ installs: { pendingInstalls } }) => pendingInstalls.get(stateId),
  )

  // Update state
  yield put<GITHUB_INSTALL_SUCCESS>({
    type: ACTIONS.GITHUB_INSTALL_SUCCESS,
    colonyAddress,
    stateId,
    repos: repoNames,
  })

  // Eventually this should redirect back to the dApp
  yield call([res, res.send], 'OK')
}
