import { Application } from 'probot'
import { Dispatch } from 'redux'
import { Router } from 'express'

import ACTIONS, { EVENT_RECIEVED, ISSUE_OPENED } from '../actions'

/*
 * Listeners should be used at the boundary of data coming in from the dApp or
 * GitHub. They should do nothing more than dispatch a redux action, with the
 * actual handling being done by sagas.
 */
const setupListeners = (app: Application, dispatch: Dispatch) => {
  setupGithubListeners(app, dispatch)
  setupDappListeners(app, dispatch)
}

const setupGithubListeners = (app: Application, dispatch: Dispatch) => {
  app.on('issues.opened', async (context) => {
    dispatch<ISSUE_OPENED>({ type: ACTIONS.ISSUE_OPENED, context })
  })
}

const setupDappListeners = (app: Application, dispatch: Dispatch) => {
  const router: Router = app.route('/colony')
  router.post('/event', req => {
    dispatch<EVENT_RECIEVED>({ type: ACTIONS.EVENT_RECIEVED, body: req.body })
  })
}

export default setupListeners
