import React, { useState, useEffect } from "react"
import {useHttp} from "../hooks/http.hook"
import Ware from "../components/ware"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"


const Categories = () => {

  
const data = useStaticQuery(graphql`
query catQuery {
  allMongodbGatsbyShopCategories(sort: { fields: name }) {
    edges {
      node {
        name
      }
    }
  }
}
`)
    const [options, setOptions] = useState([])
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
  {data.allMongodbGatsbyShopCategories.edges.map(a => {
    return (
      <label>
      <input type="checkbox" value={`${a.node.name}`} onChange = {changeHandler}/>
      {a.node.name}
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