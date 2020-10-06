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


  const logoutHandler = () => {
    logout()
  }

  useEffect(() => {

    function handleResize() {

      setWidth(window.innerWidth);
    }
    

    window.addEventListener("resize", handleResize);
    

    handleResize();
    

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          display: "flex",
          justifyContent: "space-between",
          padding: `1.45rem 1.0875rem`,
          alignItems: "center",
          position: "relative"
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
        {width > 750 ? (auth.isAuthenticated ? loggedNav() : unloggedNav()) : <BurgerMenu setOpen = {setOpen} open = {open}/>}
      </div>
      {open && width < 750 ? <BurgerSlider open = {open}>
        {(auth.isAuthenticated ? loggedNav() : unloggedNav())}
      </BurgerSlider> : null}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
