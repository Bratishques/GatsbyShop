import React, { useEffect, useState } from "react"
import "./Profile.css"
import "./AdminPage.css"
import {AddWareModal} from "../components/AddWareModal"
import AdminWare from "../components/AdminWare"
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
            <div className="admin-wares-grid">
                {wares.map(a => {
                    return <AdminWare {...a} wares = {wares} setWares = {setWares}/>
                })}
            </div>
            <Observer {...options}>
            <div >IF YOU SEE ME THIS MUST LOAD MORE SHIT HONEY</div>
          </Observer>
        </div>
    )
}

export default AdminWares