import React from "react"
import { Link } from "gatsby"
import { connect } from "react-redux"
import Price from "./price"
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
            <button onClick={increaseAmount} style= {{
                width: "35px",
                padding: "5px",
                fontSize: "20px"

            }}>{`+`}</button>
            <div>{amount()}</div>
            <button onClick={decreaseAmount} style= {{
                width: "35px",
                padding: "5px",
                fontSize: "20px"

            }}>{`-`}</button>
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
        <div className = "ware-pricename-name" ><span style={{
            marginBottom:"0",
            fontSize: "20px",
            fontStyle: "medium"
        }}>{a.name}</span></div>
        <Price className = "ware-pricename-price" price = {a.price}/>
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