import React from "react"
import { Provider } from "react-redux"
import {saveState} from "./src/components/localstorage"
import GlobalContextProvider from "./src/context/authContext"
import { createStore as reduxCreateStore } from "redux"
import {reducer} from "./src/Store/store"
import {logger, crashReporter} from "./src/Store/logger"
import { applyMiddleware } from "redux"

export const wrapRootElement = ({ element }) => {
  const createStore = () => reduxCreateStore(reducer, {cart: []}, applyMiddleware(logger, crashReporter))
  const store = createStore()
  store.subscribe(() => {
    saveState(store.getState())
  })
  return (<Provider store={store}>
    <GlobalContextProvider>
      {element}
    </GlobalContextProvider>
    </Provider>)
}



