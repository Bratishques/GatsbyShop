import React, { useEffect, useState } from "react"
import AddCategoryButton from "../components/addCategoryButton"
import AddCategoryFetcher from "../components/addCategoryFetcher"
import AdminCategory from "../components/adminCategory"
import config from "../config"
import { useHttp } from "../hooks/http.hook"
import Categories from "../pages/categories"

const AdminCategories = () => {
  const [categoryAdder, setCategoryAdder] = useState(false)
  const {baseUrl} = config
 const {request} = useHttp()
 const [categories, setCategories] = useState([])
 const [loading, setLoading] = useState(true)
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
        <div>
        {categories.map((a,i) => {
            return <AdminCategory name = {a} key = {i} categories = {categories} setCategories = {setCategories}/>
        })}
        <div> 
        {categoryAdder && <AddCategoryFetcher categories = {categories} setCategories={setCategories}/> }
        </div>
        <AddCategoryButton categoryAdder = {categoryAdder} setCategoryAdder= {setCategoryAdder}></AddCategoryButton>
            categories must be here
        </div>
    )
}

export default AdminCategories