import React, { useEffect, useState } from "react"
import AddCategoryButton from "./AddCategoryButton"
import AddCategoryFetcher from "./AddCategoryFetcher"
import DroppedCategory from "./DroppedCategory"
import config from "../config"
import { useStaticQuery, graphql } from 'gatsby'
const {baseUrl} = config




const CategoryInput = (props) => {
  const { className, inputName, form, setForm } = props
  const [isVisible, setIsVisible] = useState(false)

  const [categoryAdder, setCategoryAdder] = useState(false)

  const data = useStaticQuery(graphql`
    query MyQuery {
      allMongodbGatsbyShopCategories(sort: { fields: name }) {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  
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
  

  if (inputName === "Category") {
    return (
      <div className={`${className}`}>
        {inputName}
        <div className="category-flex">
          <div className="category-dropdown-wrap" onClick={dropHandler}>
            <div className="category-dropdown">
              <div className="category-select">{form[inputName]["value"]}</div>

              {isVisible && (
                <div>
                  {data.allMongodbGatsbyShopCategories.edges.map((a, index) => {
                    return (
                      <DroppedCategory
                        catName={`${a.node.name}`}
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
