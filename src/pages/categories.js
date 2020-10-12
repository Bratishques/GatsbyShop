import React, { useState, useEffect } from "react"
import {useHttp} from "../hooks/http.hook"
import Ware from "../components/ware"
import Layout from "../components/layout"
import config from "../config"
import "../pagepriv/adminPage.css"
import "./browse.css"



const Categories = () => {

  const {baseUrl} = config
   const [options, setOptions] = useState([])
   const [list, setList] = useState([])
   const [categories, setCategories] = useState([])
   const {request} = useHttp()
   const [loading,setLoading] = useState(true)

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
        <div className = "browse-wrap" >
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
       async function getWares(){
            if (options.length === 0) {
                let list = await request(`${baseUrl}api/list`, "PUT")
                console.log(list)
                setList([...list.list])

            }
            else {
                var arrStr = encodeURIComponent(JSON.stringify(options));
                let list = await request(`${baseUrl}api/categories/?categories=${arrStr}`, "PUT")
                setList([...list])
            }
       }
       getWares()

   }, [options] )

   useEffect(() => {
     async function getCategories() {
      let cats = await request(`${baseUrl}api/categories/list`, "GET")
      console.log(cats)
      let result = []
      for (let obj of cats) {
        result.push(obj["name"])
      }
      setCategories([...result])
      setLoading(false)
     }

     getCategories()
   }, [])
    return (
      <Layout>
  <form>
  <div className="checkbuttons" style = {{
    display: "grid",
    gridAutoFlow: "row"
  }}>
  {!loading && categories.map(a => {
    return (
      <label>
      <input type="checkbox" value={`${a}`} onChange = {changeHandler}/>
      {a}
    </label>
    )
  })}
  </div>
</form>
{mapList()}
</Layout>
    )
}



export default Categories