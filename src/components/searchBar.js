import React, { useEffect, useState } from "react"
import config from "../config"
import { useHttp } from "../hooks/http.hook"
import SearchBarResult from "./searchBarResult"
import "./searchBar.css"
import search from "../images/search.svg"



const SearchBar = props => {
  const [searchValue, setSearchValue] = useState("")
  const [dropLoading, setDropLoading] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [results, setResults] = useState([])
  const {baseUrl} = config
  const {request} = useHttp()

  const borderStyle = "2px solid rebeccapurple"

  const searchChangeHandler = e => {
    setSearchValue(e.target.value)
  }
  const blurHandler = async () => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    sleep(100).then(() => {setDropOpen(false)})
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
      className="search-bar-wrap">
      <div
        className="search-bar-flex"
      >
      <div
      style = {{
        borderTop: borderStyle,
        borderBottom: borderStyle,
        borderLeft: borderStyle,
        borderRadius: "7px 0 0 7px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3px",
        fontColor: "rebeccapurple"
      }}
      ><img src={search} style={{
        marginBottom:"0",
        width: "26px"
      }}></img></div>
        <input
        style = {{
          padding: "3px 10px",
          border:"none",
          outline:0,
          borderRadius: "0 7px 7px 0",
          borderTop: borderStyle,
          borderRight: borderStyle,
          borderBottom: borderStyle,
          display: "flex",
          alignItems: "center"
        }
        }
          type="text"
          value={searchValue}
          onChange={searchChangeHandler}
          onBlur = {blurHandler}
          onFocus = {focusHandler}
        ></input>
      </div>
     { dropOpen && <div
        className="search-bar-dropper-wrap"
        style={{
          position: "absolute",
          paddingTop: "10px",
          backgroundColor: "whitesmoke",
          width: "100%",
          display: "grid",
          gridTemplateRows: "a",
          zIndex: "100"

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