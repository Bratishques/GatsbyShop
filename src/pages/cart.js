import React, { useContext } from "react"
import { connect } from "react-redux"
import CartWare from "../components/cartWare"
import Layout from "../components/layout"
import { AuthContext } from "../context/authContext"
import "./cart.css"

const Cart = (props) => {

    const auth = useContext(AuthContext)

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
            {auth.isAuthenticated ?
            <div>
        <div><h3>Here is your cart</h3></div>
        {props.cart.length > 0 ?
        <div  className={`cart-wares-grid`}>
        {props.cart.map((a,i) => {
            return <CartWare {...a} key = {i}/>
        })}
        </div> : <div><h4> Cart is empty</h4></div>}
        <div>And here is the total: {getTotal()} USD</div>
        </div> : <div><h4>Log in to see your cart!</h4></div>
        }
        </Layout>
        
        )
}


const mapStateToProps = ({ cart }) => {
    return { cart }
  }
export default connect(mapStateToProps)(Cart)