import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CardPokedex from "./components/CardPokedex";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pokedex, setPokedex] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  useEffect(() => {
    fetchPokedex();
  }, []);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const cardLayoutStyle = {
    layout: {
      display: "grid",
      gridTemplateColumns: "auto auto",
      gap: "10px",
    },
  };
  const onTypeInput = (e) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      setTypingTimeout(null);
    }
    const text = e.target.value;
    const timeout = setTimeout(() => {
      fetchPokedex(text);
    }, 1500);
    setTypingTimeout(timeout);
  };

  const onSetSelected = (item) => {
    const pokedexData = pokedex;
    const result = pokedexData.map((arr) => {
      if (arr.id === item.id) {
        console.log(arr.selected);
        arr.selected = !arr.selected;
        console.log(arr.selected);
        return arr;
      } else {
        return arr;
      }
    });
    setPokedex(result);
  };

  const fetchPokedex = async (value) => {
    let query = "";
    console.log(value);
    if (value) {
      query = `&name=${value}`;
    }
    const response = await fetch(
      `http://localhost:3030/api/cards?limit=100` + query
    );
    const data = await response.json();
    setPokedex(
      data.cards.map((arr) => {
        console.log(arr);
        return { ...arr, selected: false };
      })
    );
  };
  return (
    <div className="App">
      <div style={cardLayoutStyle.layout}>
        {pokedex.map((item) => {
          if (item.selected) {
            return (
              <CardPokedex
                info={item}
                key={item.id}
                removeAble={true}
                onSetSelected={onSetSelected}
              />
            );
          }
        })}
      </div>
      <Navbar toggleModal={toggleModal} />
      {isOpen && (
        <Modal
          handleClose={toggleModal}
          content={
            <>
              <SearchBar onTypeInput={onTypeInput} />
              {pokedex.map((item) => {
                if (!item.selected) {
                  return (
                    <CardPokedex
                      info={item}
                      key={item.id}
                      removeAble={false}
                      onSetSelected={onSetSelected}
                    />
                  );
                }
              })}
            </>
          }
        />
      )}
    </div>
  );
};

export default App;
