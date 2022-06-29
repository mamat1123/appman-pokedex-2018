import React, { useEffect, useRef } from "react";
import { COLORS } from "../themes/colors";

const modalStyle = {
  modalBox: {
    position: "absolute",
    background: COLORS.modalOutside,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  box: {
    position: "relative",
    width: "90%",
    margin: "32px auto",
    height: "auto",
    maxHeight: "70vh",
    background: COLORS.modalContentBackground,
    boxShadow: `${COLORS.modalContentBoxShadow} 0px 0px 0px 1px`,
    borderRadius: "4px",
    padding: "20px",
    border: "1px solid #999",
    overflow: "auto",
  },
};

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
const Modal = (props) => {
  const ref = useRef();
  useOnClickOutside(ref, props.handleClose);
  return (
    <div style={modalStyle.modalBox}>
      <div style={modalStyle.box} ref={ref}>
        {/* <span className="close-icon" onClick={props.handleClose}>x</span> */}
        {props.content}
      </div>
    </div>
  );
};

export default Modal;
