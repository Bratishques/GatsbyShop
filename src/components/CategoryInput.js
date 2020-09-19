import React, { useEffect, useState } from "react"
import DroppedCategory from "./DroppedCategory"

const CategoryInput = props => {
  const { className, inputName, form, setForm } = props
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [catArr, setCatArr] = useState([])
  
  const changeForm = (e) => {
    setForm({...form, 
        [inputName]:{
          value: e.target.value,
          isValid: true
        }
    })
  }
  const dropHandler = () => {
      setIsVisible(!isVisible)
  }

  useEffect(() => {
      const getCategories = async () => {
        setLoading(true)
        const data = await fetch("/api/categories/list", {method: "GET"})
        const cats = await data.json()
        setCatArr(cats)
        setLoading(false)
      }

  }, [isVisible])

  if (inputName === "Category") {
    return (

      <div className={`${className}`}>
        {inputName}
        <div className="category-flex">
        <div className = "category-dropdown-wrap" onClick={dropHandler}>
          <div className = "category-dropdown" >
          <div className="category-select">{form[inputName]["value"]}</div>
          {isVisible && 
          <div>

          <DroppedCategory catName={`Ya Eblan`} changeForm={changeForm}/>
          <DroppedCategory catName={`Ya Ne Eblan`} changeForm={changeForm}/>
          <DroppedCategory catName={`Ya Eblan`} changeForm={changeForm}/>
          <DroppedCategory catName={`Ya Ne Eblan`} changeForm={changeForm}/>
          </div>

          }
          </div>
          </div>
          <button>+</button>
        </div>
      </div>
    )
  }

}

export default CategoryInput
