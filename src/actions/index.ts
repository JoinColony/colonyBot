import { Action } from 'redux'
import { Context } from 'probot'
import { Request, Response } from 'express'

const ACTIONS = {
  GITHUB_PRE_INSTALL: 'GITHUB_PRE_INSTALL',
  GITHUB_PRE_INSTALL_SUCCESS: 'GITHUB_PRE_INSTALL_SUCCESS',
  GITHUB_INSTALL: 'GITHUB_INSTALL',
  GITHUB_INSTALL_SUCCESS: 'GITHUB_INSTALL_SUCCESS',
  ISSUE_OPENED: 'ISSUE_OPENED',
  EVENT_RECIEVED: 'EVENT_RECIEVED',
}

export type GITHUB_PRE_INSTALL = Action<typeof ACTIONS.GITHUB_PRE_INSTALL> & { req: Request, res: Response }
export type GITHUB_PRE_INSTALL_SUCCESS = Action<typeof ACTIONS.GITHUB_PRE_INSTALL_SUCCESS> & { colonyAddress: string, stateId: string }
export type GITHUB_INSTALL = Action<typeof ACTIONS.GITHUB_INSTALL> & { req: Request, res: Response }
export type GITHUB_INSTALL_SUCCESS = Action<typeof ACTIONS.GITHUB_INSTALL_SUCCESS> & { colonyAddress: string, stateId: string, repos: string[] }
export type ISSUE_OPENED = Action<typeof ACTIONS.ISSUE_OPENED> & { context: Context }
export type EVENT_RECIEVED = Action<typeof ACTIONS.EVENT_RECIEVED> & { req: Request, res: Response }

export default ACTIONS
