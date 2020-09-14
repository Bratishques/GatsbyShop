import React, { useState, useContext, useEffect } from "react"
import Observer from '@researchgate/react-intersection-observer';
import Layout from "../components/layout"
import { useHttp } from "../hooks/http.hook"
import { Link } from "gatsby"
import { connect } from "react-redux"
import Ware from "../components/ware"
import "../browse.css"

 const Browse = () => {
    const [wares,setWares] = useState([])
    const {request, loading} = useHttp()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageLoaded, setPageLoaded] = useState(false)
    const [intersecting, setIntersecting] = useState(false)

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
        let list = await request(`/api/list/?page=${currentPage}`, "PUT")
        setTotalPages(list.totalPages)
        setWares(wares.concat(list.list))           
    }
    if (currentPage > 0) {
    callList()
    }

    
    },[currentPage])

    const mapWares = () => {
        return (
            <div className = "browse-wrap">
            {wares.map((a,i) => {
                return (
                    <>
                    <Ware a = {a}/>
                    </>
                )
            })}

            </div>
        )
    }

    return (
        <Layout>
        <div id="scrolling-container">
        <div>Hi, this is a shop!</div>
         {mapWares()}
         <Observer {...options}>
            <div >IF YOU SEE ME THIS MUST LOAD MORE SHIT HONEY</div>
        </Observer>
        </div>
        </Layout>
    )
}

const mapStateToProps = ({total}) => {
    return {total}
}
const mapDispatchToProps = dispatch => {
    return { addItem: () => dispatch({ type: `ADD_ITEM` }) }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Browse)