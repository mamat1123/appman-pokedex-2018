import React from "react";
import { COLORS } from "../themes/colors";

const searchBarStyle = {
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  searchInput: {
    background: "transparent",
    flex: "1",
    border: `2px solid ${COLORS.searchBoxBorder}`,
    padding: "16px 4px",
    width: "-webkit-fill-available",
    fontSize: "24px",
  },
  searchButton: {
    border: "0",
    // borderRadius: "50%",
    // width: "50px",
    // height: "50px",
    position: "absolute",
    right: 0,
    cursor: "pointer",
  },
};

const SearchBar = (props) => {
  return (
    <div style={searchBarStyle.container}>
      <input
        onChange={props.onTypeInput}
        style={searchBarStyle.searchInput}
        type="text"
        placeholder="Find pokemon"
        name="q"
      />
      <button type="submit" style={searchBarStyle.searchButton}>
        {" "}
        {/* <i class="fas fa-search"></i> */}
      </button>
    </div>
  );
};

export default SearchBar;
