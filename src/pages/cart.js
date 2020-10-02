import React, { useContext } from "react"
import { connect } from "react-redux"
import CartWare from "../components/cartWare"
import Layout from "../components/layout"
import { AuthContext } from "../context/authContext"
import "./cart.css"

const Cart = (props) => {

    console.log(props)
    const auth = useContext(AuthContext)

    const getTotal = () => {
        let total = 0
        for (let item of props.cart) {
            
            let price = item.count * item.ware.price
            price = Number(price).toFixed(2)
            console.log(price)
            total += Number(price)
        }
        return Number(total).toFixed(2)

    }
    
    return (
        <Layout>
            {auth.isAuthenticated &&
            <div>
        <div>Here is your cart</div>
        <div  className={`cart-wares-grid`}>
        {props.cart.map(a=> {
            return <CartWare {...a}/>
        })}
        </div>
        <div>And here is the total: {getTotal()} USD</div>
        </div>
        }
        </Layout>
        
        )
}


const mapStateToProps = ({ cart }) => {
    return { cart }
  }
export default connect(mapStateToProps)(Cart)