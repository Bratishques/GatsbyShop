import React, { useState } from "react"
import AddCategoryButton from "./AddCategoryButton"
import AddCategoryFetcher from "./AddCategoryFetcher"
import DroppedCategory from "./DroppedCategory"
import config from "../config"
import { useHttp } from "../hooks/http.hook"
const {baseUrl} = config




const CategoryInput = (props) => {
  const { className, inputName, form, setForm } = props
  const [isVisible, setIsVisible] = useState(false)
  const [catArr, setCatArr] = useState([])
  const [loading, setLoading] = useState(false)
  const [categoryAdder, setCategoryAdder] = useState(false)
  const {request} = useHttp()
  
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
      if (catArr.length === 0) {
        const getCat = async () => {
        setLoading(true)
        let list = await request(`${baseUrl}api/categories/list`, "GET")
        let result = []
        for (let obj of list) {
          result.push(obj["name"])
        }
        setCatArr ([...result])
        setLoading(false)
        }
        getCat()
      }
      else {
        setCatArr([])
      }
  
  }
  

  if (inputName === "Category") {
    return (
      <div className={`${className}`}>
        {inputName}
        <div className="category-flex">
          <div className="category-dropdown-wrap" onClick={dropHandler}>
            <div className="category-dropdown">
              <div className="category-select">{form[inputName]["value"]}</div>
              {(isVisible && loading) && (
                <div>Loading...</div>
              )}
              {(isVisible && !loading) && (
                <div className="dropdown dropdown-wrap">
                  {catArr.map((a, index) => {
                    return (
                      <DroppedCategory
                        catName={`${a}`}
                        changeForm={changeForm}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <AddCategoryButton
            categoryAdder={categoryAdder}
            setCategoryAdder={setCategoryAdder}
          />
        </div>
        {categoryAdder && <div>Add new</div>}
        {categoryAdder && (
          <AddCategoryFetcher
            categoryAdder={categoryAdder}
            setCategoryAdder={setCategoryAdder}
          />
        )}
      </div>
    )
  }

}

export default CategoryInput
