import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { useAuth } from "../hooks/auth.hook"
import { AuthContext } from "../context/AuthContext"
import StyledLink from "../components/styledLink"
import "./header.css"
import CartCount from "./cartCount"

const Header = ({ siteTitle }) => {
  const {logout} = useAuth()
  const auth = useContext(AuthContext)
  
  const logoutHandler = () => {
    logout()
  }

  const loggedNav = () => {
    return (
      <ul className = "nav-wrap">
        <StyledLink to="/app/page2">
        <CartCount></CartCount>
        </StyledLink>
        <StyledLink to="/Categories">Categories</StyledLink>
        <StyledLink to="/browse">Browse</StyledLink>
        <StyledLink to={`/app/profile/${auth.idee}`}>Profile</StyledLink>
        
        <button onClick={logoutHandler}>Logout</button>
      </ul>
    )
  }

  const unloggedNav = () => {
    return (
      <ul className = "nav-wrap">
      <StyledLink to="/app/page2">Login</StyledLink>
      <StyledLink to="/app/page2">
      <CartCount></CartCount>
      </StyledLink>
      <StyledLink to="/browse">Browse</StyledLink>
      <StyledLink to="/Categories">Categories</StyledLink>
      <StyledLink to="/app/page2">Verify account</StyledLink>
    </ul>
    )
  }


return(
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
        padding: `1.45rem 1.0875rem`,
      }}
    >
        <Link
          to="/"
          style={{
            fontSize: `30px`,
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      {auth.isAuthenticated ? loggedNav() : unloggedNav()}
    </div>
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
