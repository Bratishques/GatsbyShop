import React from "react"
import GlobalContextProvider from "./src/context/AuthContext"
import { Provider } from "react-redux"
import createStore from "./src/Store/store"
import {saveState}  from "./src/components/localstorage"

export const wrapRootElement = ({ element }) => {
  const store = createStore()
  store.subscribe(() => {
    saveState(store.getState())
  })
  return (
  <Provider store={store}>
  <GlobalContextProvider>
    {element}
  </GlobalContextProvider>
  </Provider>
  )
}