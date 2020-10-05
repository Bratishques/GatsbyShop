import React, { useState, useEffect, useMemo } from "react"
import Observer from "@researchgate/react-intersection-observer"
import Layout from "../components/layout"
import { useHttp } from "../hooks/http.hook"
import { connect } from "react-redux"
import Ware from "../components/ware"
import "./browse.css"
import config from "../config"
import SearchBar from "../components/searchBar"

const Browse = () => {
  const [wares, setWares] = useState([])
  const { request, loading } = useHttp()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { baseUrl } = config
  const [intersecting, setIntersecting] = useState(false)

  const handleIntersection = event => {
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
    threshold: 1,
  }

  useEffect(() => {
    async function callList(currentPage) {
      let list = await request(`${baseUrl}api/list/?page=${currentPage}`, "PUT")
      setTotalPages(list.totalPages)
      setWares(wares.concat(list.list))
    }
    callList(currentPage)
  }, [currentPage, request])

  const mapWares = () => {
    return (
      <div className="browse-wrap">
        {wares.map((a) => {
          return (
              <Ware a={a}/>
          )
        }) }
      </div>
    )
  }

  return (
    <Layout>
      <div id="scrolling-container">
        <div className= "browse-top">Hi, this is a shop! <SearchBar/></div>
        {mapWares()}
        <Observer {...options}>
          <div>Intersection obs</div>
        </Observer>
      </div>
    </Layout>
  )
}

const mapStateToProps = ({ total }) => {
  return { total }
}
const mapDispatchToProps = dispatch => {
  return { addItem: () => dispatch({ type: `ADD_ITEM` }) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse)
