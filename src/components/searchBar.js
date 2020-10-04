import React, { useEffect, useState } from "react"
import config from "../config"
import { useHttp } from "../hooks/http.hook"
import SearchBarResult from "./searchBarResult"

const SearchBar = props => {
  const [searchValue, setSearchValue] = useState("")
  const [dropLoading, setDropLoading] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [results, setResults] = useState([])
  const {baseUrl} = config
  const {request} = useHttp()

  const searchChangeHandler = e => {
    setSearchValue(e.target.value)
  }
  const blurHandler = () => {
    setDropOpen(false)
  }
  const focusHandler = () => {
    setDropOpen(true)
  }
  useEffect(() => {
    const searchHandler = async () => {
        if (searchValue.length > 1) {
            setDropOpen(true)
            if (results.length === 0) {
            setDropLoading(true)
          }
            const data = await request(`${baseUrl}api/products/search/?searchstr=${searchValue}`)
            setResults([...data.results])
            setDropLoading(false)
        }
        else {
          setDropOpen(false)
        }
    }
    searchHandler()
  }, [searchValue])

  return (
    <div
      className="search-bar-wrap"
      style={{
        display: "inline-block",
        position: "relative"
      }}
    >
      <div
        className="search-bar-flex"
        style={{
          display: "flex",
          width: "30vw",
          minWidth: "300px",
          position: "relative",
        }}
      >
        <input
          type="text"
          value={searchValue}
          onChange={searchChangeHandler}
          onBlur = {blurHandler}
          onFocus = {focusHandler}
        />
        <button>Search</button>
      </div>
     { dropOpen && <div
        className="search-bar-dropper-wrap"
        style={{
          position: "absolute",
          paddingTop: "10px",
          backgroundColor: "whitesmoke",
          width: "100%",
          display: "grid",
          gridTemplateRows: "a"

        }}
      > {dropLoading ? <div
      style = {{
          padding: "0 10px"
      }}
      >...Loading</div> : results.map(a => {
        return <SearchBarResult {...a}/>
      })}
        
        
      </div>}
    </div>
  )
}

export default SearchBar