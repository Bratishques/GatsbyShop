import React, { useState } from "react"
import config from "../config"
import { useHttp } from "../hooks/http.hook"
const { baseUrl } = config

const AddCategoryFetcher = (props) => {
  const { request } = useHttp()
  const [loading, setLoading] = useState(false)
  const [candidate, setCandidate] = useState("")
  const [finished, setFinished] = useState({
    error: false,
    message: "",
    done: false,
  })

  const clickHandler = async () => {
    try {
      setLoading(true)
      console.log(candidate)
      const { error, message } = await request(
        `${baseUrl}api/categories/add`,
        "POST",
        { category: candidate }
      )
      setFinished({
        error: error,
        message: message,
        done: true,
      })
      if (props.categories) {
        const newCats = props.categories.push(candidate)
        props.setCategories([...newCats])
      }
      setLoading(false)
     
    } catch (e) {
      console.log(e)
    }
  }
  const inputHandler = e => {
    setCandidate(e.target.value)
  }


  return (
    <div>
      <div>
        <input onBlur={inputHandler}></input>
        <button onClick={clickHandler} disabled={loading}>
          {!loading ? `Add Category` : `Adding...`}
        </button>
      </div>
      {finished.done && <div>{finished.message}</div>}
    </div>
  )
}

export default AddCategoryFetcher
