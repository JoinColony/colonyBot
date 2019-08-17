import { Action } from 'redux'
import { Context } from 'probot'

const ACTIONS = {
  ISSUE_OPENED: 'ISSUE_OPENED',
  EVENT_RECIEVED: 'EVENT_RECIEVED',
}

export default ACTIONS

export type ISSUE_OPENED = Action<typeof ACTIONS.ISSUE_OPENED> & { context: Context }
export type EVENT_RECIEVED = Action<typeof ACTIONS.EVENT_RECIEVED> & { body: any }
