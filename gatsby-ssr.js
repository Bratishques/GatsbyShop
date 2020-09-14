const React = require("react")
const GlobalContextProvider = require("./src/context/AuthContext")
  .default

exports.wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
