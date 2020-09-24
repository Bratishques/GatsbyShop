import React, { useState } from "react"
import "./Profile.css"
import "./AdminPage.css"
import {AddWareModal} from "../components/AddWareModal"
import { useStaticQuery, graphql } from "gatsby"
import AdminWare from "../components/AdminWare"

const AdminWares = () => {
    const data = useStaticQuery(graphql`
    {
      allMongodbGatsbyShopProducts {
        nodes {
          image
          category
          description
          name
          price
          inStock
        }
      }
    }
  `)
  
  console.log(data.allMongodbGatsbyShopProducts.nodes)


    const [isAdding, setIsAdding] = useState(false)

    const addNewItem = () => {
        setIsAdding(!isAdding)
    }

    return (
        <div>
            <AddWareModal isAdding = {isAdding} setIsAdding = {setIsAdding} />
            <button onClick={addNewItem}>
                Add a new Item ++
            </button>
            <br/>
            Browse and Modify
            <div className="admin-wares-grid">
                {data.allMongodbGatsbyShopProducts.nodes.map(a => {
                    return <AdminWare {...a}/>
                })}
            </div>
        </div>
    )
}

export default AdminWares