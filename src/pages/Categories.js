import React, { useState, useEffect } from "react"
import {useHttp} from "../hooks/http.hook"
import Ware from "../components/ware"
import Layout from "../components/layout"

const Categories = () => {
    const [options, setOptions] = useState([])
   const [flag, setFlag] = useState(true)
   const [list, setList] = useState([])
   const {request} = useHttp()

   const changeHandler = (e) => {
       if (options.indexOf(e.target.value) >= 0) {
        setOptions(options.filter(a => a !== e.target.value))
       }
       else {
        setOptions([...options, e.target.value])
       }
   }

   const mapList = () => {
    return (
        <div>
        {list.map(a => {
            return (
                <>
                <Ware a = {a}/>
                </>
            )
        })}
        </div>
    )
}

   useEffect(() => {
       async function getCategories(){
            if (options.length === 0) {
                let list = await request("/api/list", "PUT")
                console.log(list)
                setList([...list.list])

            }
            else {
                var arrStr = encodeURIComponent(JSON.stringify(options));
                let list = await request(`/api/categories/?categories=${arrStr}`, "PUT")
                setList([...list])
            }
       }
       getCategories()

   }, [options] )
    return (
      <Layout>
  <form>
  <div className="radio">
    <label>
      <input type="checkbox" value="category1" onChange = {changeHandler}/>
      cat 1
    </label>
  </div>
  <div className="radio">
    <label>
      <input type="checkbox" value="category2" onChange = {changeHandler}/>
      cat 2
    </label>
  </div>
  <div className="radio">
    <label>
      <input type="checkbox" value="category3" onChange = {changeHandler}/>
      cat 3
    </label>
  </div>
  <div className="radio">
    <label>
      <input type="checkbox" value="category4" onChange = {changeHandler}/>
      cat 4
    </label>
  </div>
</form>
{mapList()}
</Layout>
    )
}

export default Categories