import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useContext, useEffect } from "react"
import { useAuth } from "../hooks/auth.hook"
import { AuthContext } from "../context/authContext"
import StyledLink from "../components/styledLink"
import "./header.css"
import CartCount from "./cartCount"
import BurgerMenu from "./burgerMenu"
import BurgerSlider from "./burgerSlider"

const Header = ({ siteTitle }) => {
  const { logout } = useAuth()
  const auth = useContext(AuthContext)
  const [width, setWidth] = useState(window.innerWidth)
  const [open, setOpen] = useState(false)
  const [click, setClick] = useState(0)
  const [hiddenHeader, setHiddenHeader] = useState(false)

  const logoutHandler = () => {
    logout()
  }

  const header = document.getElementById("header")


  let prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
    console.log(window.scrollY)
    var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    
    setHiddenHeader(false)
  } else {
    setHiddenHeader(true)
  }
  prevScrollpos = currentScrollPos;

  }
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const loggedNav = () => {
    return (
      <ul className="nav-wrap">
        <StyledLink to="/cart">
          <CartCount></CartCount>
        </StyledLink>
        <StyledLink to="/categories">Categories</StyledLink>
        <StyledLink to="/browse">Browse</StyledLink>
        <StyledLink to={`/app/profile/${auth.idee}`}>Profile</StyledLink>
        {auth.admin && <StyledLink to={`/admin/main`}>Admin Panel</StyledLink>}
        <button onClick={logoutHandler}>Logout</button>
      </ul>
    )
  }

  const unloggedNav = () => {
    return (
      <ul className="nav-wrap">
        <StyledLink to="/app/page2">Login</StyledLink>
        <StyledLink to="/cart">
          <CartCount></CartCount>
        </StyledLink>
        <StyledLink to="/browse">Browse</StyledLink>
        <StyledLink to="/categories">Categories</StyledLink>
        <StyledLink to="/app/page2">Verify account</StyledLink>
      </ul>
    )
  }

  return (
<div>

<div>
  {width < 750 ? (
          <BurgerSlider open={open} click={click}>
            {auth.isAuthenticated ? loggedNav() : unloggedNav()}
          </BurgerSlider>
        ) : null}
        </div>
      <header id = "header"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          height: `${hiddenHeader ? "0px" : `88px`}`,
          padding: `${width > 750 ? "0px 10rem" : "0px 2.5rem"}`,
          alignItems: "center",
          position: 'fixed',
          background: `rebeccapurple`,
          zIndex: "200",
          top: "0%",
          transition: "0.3s all",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: `30px`,
            color: `white`,
            textDecoration: `none`,
            fontFamily: `Roboto`,
          }}
        >
          {siteTitle}
        </Link>
        {width > 900 ? (
          auth.isAuthenticated ? (
            loggedNav()
          ) : (
            unloggedNav()
          )
        ) : (
          <BurgerMenu setOpen={setOpen} open={open} setClick={setClick} />
        )}
        
      
    
</header>

</div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
