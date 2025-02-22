import React, { useEffect, useState } from "react"
import "./profile.css"
import "./adminPage.css"
import "../components/ware.css"
import "../pages/browse.css"
import {AddWareModal} from "../components/addWareModal"
import AdminWare from "../components/adminWare"
import Observer from '@researchgate/react-intersection-observer';
import { useHttp } from "../hooks/http.hook"
import config from "../config"

const AdminWares = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [wares,setWares] = useState([])
    const {request, loading} = useHttp()
    const [isAdding, setIsAdding] = useState(false)
    const [intersecting, setIntersecting] = useState(false)
    const {baseUrl} = config

    const addNewItem = () => {
        setIsAdding(!isAdding)
    }


    const handleIntersection = (event) => {
      if (!loading) {
      setIntersecting(!intersecting)
      console.log("yes")
      }
      if (intersecting && currentPage < totalPages) {
          setCurrentPage(currentPage + 1)
      }
    }

  const options = {
      onChange: handleIntersection,
      root: null,
      threshold: 1
    };

    useEffect( () => {
      async function callList() {
      let list = await request(`${baseUrl}api/list/?page=${currentPage}`, "PUT")
      setTotalPages(list.totalPages)
      setWares(wares.concat(list.list))           
  }
  if (currentPage > 0) {
  callList()
  }

  
  },[currentPage])

    return (
        <div>
            <AddWareModal isAdding = {isAdding} setIsAdding = {setIsAdding} wares = {wares} setWares = {setWares}/>
            <button onClick={addNewItem}>
                Add a new Item ++
            </button>
            <br/>
            Browse and Modify
            <div className="browse-wrap">
                {wares.map((a, i) => {
                    return <AdminWare {...a} wares = {wares} setWares = {setWares} key = {i}/>
                })}
            </div>
            <Observer {...options}>
            <div >Observer</div>
          </Observer>
        </div>
    )
}

export default AdminWares