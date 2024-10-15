import React, { createContext, ReactElement, useReducer } from 'react'

export enum CAMERA_MODE {
  ENVIRONMENT = 'environement',
  USER = 'user',
}

// assuming other types will be added
export enum QRScanType {
  TICKET = 'ticket',
  UNDEFINED = '',
}

interface QRChildrenProps {
  children?: ReactElement
}

interface ResultProps {
  id: number
  eventId?: number
  lastName?: string
  firstName?: string
}

export enum QRModalId {
  notFound,
  redirect,
  invalidQR,
  cameraBlocked,
}

export interface QRList {
  scanList: any[]
  qrFilteredList: any[] | boolean
  outsideDate: boolean
}

interface QRState extends QRList {
  scannerType: string
  result: ResultProps
  qrActive: boolean
  cameraMode: CAMERA_MODE | boolean
  modal: QRModalId | boolean
}

export enum QRAction {
  SET_RESULT = 'SET_RESULT',
  CLEAR_RESULT = 'CLEAR_RESULT',
  SET_RESULT_REDIRECT = 'SET_RESULT_REDIRECT',
  TOGGLE_QR_SEARCH = 'TOGGLE_QR_SEARCH',
  SET_SCAN_LIST = 'SET_SCAN_LIST',
  SET_CAMERA = 'SET_CAMERA',
  SET_MODAL = 'SET_MODAL',
  SET_ERROR_MODAL = 'SET_ERROR_MODAL',
}

export const defaultResult = {
  id: -1,
}

const initialState: QRState = {
  result: defaultResult,
  qrActive: false,
  scannerType: QRScanType.UNDEFINED,
  scanList: [],
  qrFilteredList: false,
  cameraMode: false,
  modal: false,
  outsideDate: false,
}
interface QRReducerAction {
  type: QRAction
  payload?: any
}

export const QRContext = createContext<QRState>(initialState)
export const QRDispatchContext = createContext<React.Dispatch<QRReducerAction>>(
  () => {}
)

const qrReducer = (state: QRState, action: QRReducerAction): QRState => {
  const { payload, type } = action
  switch (type) {
    case QRAction.TOGGLE_QR_SEARCH:
      return {
        ...state,
        qrActive: payload,
        result: defaultResult,
        qrFilteredList: false,
        modal: false,
      }

    case QRAction.SET_RESULT:
      return {
        ...state,
        result: payload.result,
        scannerType: payload.type,
        modal: false,
        qrFilteredList: [payload.found],
      }

    case QRAction.SET_RESULT_REDIRECT:
      return {
        ...state,
        result: payload.result,
        modal: QRModalId.redirect,
        scannerType: payload.type,
        qrFilteredList: false,
      }

    case QRAction.CLEAR_RESULT:
      return {
        ...state,
        result: defaultResult,
        scannerType: QRScanType.UNDEFINED,
        modal: false,
        qrFilteredList: false,
      }

    case QRAction.SET_SCAN_LIST:
      return { ...state, ...payload }

    case QRAction.SET_MODAL:
      return { ...state, modal: payload }

    case QRAction.SET_ERROR_MODAL:
      return {
        ...state,
        result: { id: -2 },
        modal: payload,
        qrFilteredList: false,
      }

    case QRAction.SET_CAMERA:
      return { ...state, cameraMode: payload }

    default:
      return state
  }
}

const QRProvider = ({ children }: QRChildrenProps) => {
  const [state, dispatch] = useReducer(qrReducer, initialState)
  return (
    <QRContext.Provider value={state}>
      <QRDispatchContext.Provider value={dispatch}>
        {children}
      </QRDispatchContext.Provider>
    </QRContext.Provider>
  )
}

export default QRProvider
