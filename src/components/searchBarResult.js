import React from "react"

const searchBarResult = props => {
  //const isWare = !!props.price
  const isWare = true
  return (
    <div
      className="search-bar-dropper-wrap"
      style={{
        padding: "5px 10px",
        position: "relative",
      }}
    >
      {isWare ? <div className="serach-bar-dropper-ware-grid"
      style = {{
          display: "grid",
          gridTemplateColumns: "50px 1fr",
          columnGap: "10px"
      }}
      >
      <div style = {{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px"
      }}>IMG</div>
      <div style = {{
          display: "flex",
          alignItems: "center",
      }}>Text</div>

      </div> : <div className="serach-bar-dropper-ware-grid"
      style = {{
          display: "grid",
          gridTemplateColumns: "50px 1fr",
          columnGap: "10px"
      }}
      >

      </div>}
    </div>
  )
}

export default searchBarResult