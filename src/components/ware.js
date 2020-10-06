import React from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import "./ware.css"
const Ware = ({ addItem, a, cart, increaseAmount, decreaseAmount}) => {

    const wareButton = () => {
        const find = () => {
            for (let elem of cart) {
                if (elem.id === a._id && elem.count > 0) {
                    return true
                }
            }
            return false
        }

        const amount = () => {
            for (let elem of cart) {
                if (elem.id === a._id) {
                    return elem.count
                }
            }
        }
        
        if (!find()) {
            return (
            <>
            <button onClick={addItem}>{`ADD TO CART`}</button>
            </>
            )
        }
        if (find()) {
            return (
            <div className = {`ware-buttons`}>
            <button onClick={increaseAmount}>{`+`}</button>
            {amount()}
            <button onClick={decreaseAmount}>{`-`}</button>
            </div>
            )
        }
    }

    return (
        <div className = "ware">
        <Link to={`/app/ware/${a._id}`} style={{
            textDecoration: "none",
            color: "black",
            display: `flex`,
            flexDirection: `column`,
            alignItems: `center`,
            textAlign: `center`
        }}>
        <img className = "wareImage" src={a.image} alt={a.name}/>
        <div className="ware-pricename-grid">
        <div className = "ware-pricename-name"><h4>{a.name}</h4></div>
        <div className = "ware-pricename-price">{a.price}</div>
        </div>
        <div>
        </div>
        </Link>
        

        {wareButton()}

        
        
        
        
        </div>
    )
}

const mapStateToProps = ({cart}) => {
    return {cart}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    const a = ownProps.a
    return { addItem: () => dispatch({ 
                type: `ADD_ITEM`,
                payload: a
            }),
            increaseAmount: () => dispatch({
                type: `INCREASE_AMOUNT`,
                payload: a
            }),
            decreaseAmount: () => dispatch({
                type: `DECREASE_AMOUNT`,
                payload: a
            })
}
  }

  export default connect(mapStateToProps,mapDispatchToProps)(Ware)