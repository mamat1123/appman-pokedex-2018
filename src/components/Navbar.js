import React from "react";

const nevBarStyle = {
  nevbar: {
    width: "-webkit-fill-available",
    position: "absolute",
    bottom: 0,
    height: "70px",
    backgroundColor: "#ec5656",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  circleButton: {
    width: "100px",
    height: "100px",
    borderRadius: "100%",
    border: 0,
    backgroundColor: "#dc7777",
    color: "#fff",
    fontSize: "68px",
    position: "relative",
    top: "-28px",
    textAlign: "center",
    cursor: "pointer",
  },
};

const Navbar = (props) => {
  return (
    <div style={nevBarStyle.nevbar}>
      <button style={nevBarStyle.circleButton} onClick={props.toggleModal}>
        +
      </button>
    </div>
  );
};

export default Navbar;
