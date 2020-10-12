import React, { useContext } from "react"
import { connect } from "react-redux"
import CartWare from "../components/cartWare"
import Layout from "../components/layout"
import config from "../config"
import { AuthContext } from "../context/authContext"
import { useHttp } from "../hooks/http.hook"
import "./cart.css"

const Cart = props => {
  const { request } = useHttp()
  const { baseUrl } = config

  const auth = useContext(AuthContext)

  const checkoutHandler = async () => {
    try {
      const data = await request(`${baseUrl}api/checkout`, "POST", {
        cart: props.cart,
        id: JSON.parse(localStorage.getItem("accdata")).userId,
      })
      console.log(data)
      props.clearCart()
    } catch (e) {
      console.log(e)
    }
  }

  const getTotal = () => {
    let total = 0
    for (let item of props.cart) {
      let price = item.count * item.ware.price
      price = Number(price).toFixed(2)

      total += Number(price)
    }
    return Number(total).toFixed(2)
  }

  return (
    <Layout>
      {auth.isAuthenticated ? (
        <div>
          <div>
            <h3>Here is your cart</h3>
          </div>
          {props.cart.length > 0 ? (
            <div className={`cart-wares-grid`}>
              {props.cart.map((a, i) => {
                return <CartWare {...a} key={i} />
              })}
            </div>
          ) : (
            <div>
              <h4> Cart is empty</h4>
            </div>
          )}
          <button onClick={checkoutHandler}>Checkout</button>
          <div>And here is the total: {getTotal()} USD</div>
        </div>
      ) : (
        <div>
          <h4>Log in to see your cart!</h4>
        </div>
      )}
    </Layout>
  )
}

const mapStateToProps = ({ cart }) => {
  return { cart }
}

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () =>
      dispatch({
        type: "CART_EMPTY",
      }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
