import { Action, Reducer } from 'redux'

import ACTIONS, { GITHUB_PRE_INSTALL_SUCCESS, GITHUB_INSTALL_SUCCESS } from '../actions'

export type InstallsState = {
  // colonyAddress -> repos
  colonyInstalls: Map<string, Set<string>>,
  // repo -> colonyAddress
  repoInstalls: Map<string, string>,
  // stateId -> colonyAddress
  pendingInstalls: Map<string, string>,
}

const INITIAL_STATE = {
  colonyInstalls: new Map(),
  repoInstalls: new Map(),
  pendingInstalls: new Map(),
}

const installsReducer: Reducer<InstallsState, Action> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case ACTIONS.GITHUB_PRE_INSTALL_SUCCESS: {
      const { colonyAddress, stateId } = action as GITHUB_PRE_INSTALL_SUCCESS
      state.pendingInstalls.set(stateId, colonyAddress)
      return state
    }

    case ACTIONS.GITHUB_INSTALL_SUCCESS: {
      const { colonyAddress, stateId, repos } = action as GITHUB_INSTALL_SUCCESS
      state.pendingInstalls.delete(stateId)
      state.colonyInstalls.set(colonyAddress, new Set(repos))
      repos.map(repo => state.repoInstalls.set(repo, colonyAddress))
      return state
    }

    default:
      return state
  }
}

export default installsReducer
