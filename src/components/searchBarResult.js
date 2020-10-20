import React from "react"
import StyledLink from "./styledLink"

const searchBarResult = props => {
  console.log(props)
  const isWare = !!props.price
  const id = props._id
  return (
    <div
      className="search-bar-dropper-wrap"
      style={{
        padding: "5px 10px",
        position: "relative",
      }}
    >
      {isWare ? (

        <button
          style={{
            border: "none",
            width: "100%",
          }}
        >
                <StyledLink to={`/app/ware/${id}`}>
          <div
            className="serach-bar-dropper-ware-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr",
              columnGap: "10px",
            }}
          >
            <img
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "50px",
                objectFit: "contain",
                marginBottom: "0",
              }}
              src={props.image}
              alt={props.name}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {props.name}
            </div>
          </div>
          </StyledLink>
        </button>
     
      ) : ( null
        
      )}
    </div>
  )
}

export default searchBarResult


{/* <div
          className="serach-bar-dropper-category"
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h4
            style={{
              marginBottom: "0px",
            }}
          >
            {props.name}
          </h4>
        </div> */}