import React, { useState } from "react";
import { COLORS } from "../themes/colors";

const cardStyle = {
  image: {
    width: "150px",
  },
  addBtn: {
    position: "absolute",
    right: "10px",
    color: COLORS.ColorAddButton,
    fontSize: "24px",
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "10px",
    position: "relative",
    margin: "20px 0",
    backgroundColor: COLORS.CardBackground,
    boxShadow: `${COLORS.cardBoxShadow} 0px 0px 0px 1px`,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  infomation: {
    padding: "20px",
    width: "60%",
  },
  title: {
    fontSize: "24px",
    textTransform: "uppercase",
  },
  label: {
    width: "100px",
  },
  happiness: {
    width: "50px",
    height: "50px",
    marginRight: "4px",
    borderRadius: "100%",
    backgroundColor: COLORS.levelTubeValueBackground,
  },
};

const progressBar = (value) => {
  const progressBarStyle = {
    container: {
      position: "relative",
      height: "20px",
      width: "100%",
    },
    bgProgress: {
      border: 1,
      backgroundColor: COLORS.levelTubeBackground,
      boxShadow: `${COLORS.levelTubeBoxShadow} 0px 0px 0px 1px`,
      borderRadius: "10px",
      width: `100%`,
      height: "100%",
    },
    progress: {
      border: 1,
      backgroundColor: COLORS.levelTubeValueBackground,
      position: "absolute",
      boxShadow: `${COLORS.levelTubeBoxShadow} 0px 0px 0px ${
        value > 1 ? 1 : 0
      }px`,
      borderRadius: "10px",
      width: `${value}%`,
      height: "100%",
      top: 0,
    },
  };
  return (
    <div style={progressBarStyle.container}>
      <div style={progressBarStyle.bgProgress} />
      <div style={progressBarStyle.progress} />
    </div>
  );
};

const hpCalculation = (hp) => {
  if (isNaN(hp)) {
    return 0;
  } else {
    return hp > 100 ? 100 : hp;
  }
};

const strengthCalculation = (attacks) => {
  if (attacks) {
    const str = attacks.length * 50;
    return str > 100 ? 100 : str;
  } else {
    return 0;
  }
};

const weaknessesCalculation = (weaknesses) => {
  if (weaknesses) {
    const weak = weaknesses.length * 100;
    return weak > 100 ? 100 : weak;
  } else {
    return 0;
  }
};

const damageCalculation = (damage) => {
  if (damage) {
    const damageCal = damage
      .map((item) => {
        return +item.damage.replace(/[-+*×\s]/g, "");
      })
      .reduce((a, b) => a + b, 0);
    return damageCal;
  } else {
    return 0;
  }
};

const happinessLevelCalculation = (hp, damage, weaknesses) => {
  const happiness = Math.abs((hp / 10 + damage / 10 + 10 - weaknesses / 2) / 5);
  return Math.round(happiness);
};

const CardPokedex = (props) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        ...cardStyle.container,
        ...(hover
          ? { boxShadow: `${COLORS.cardBoxShadowHover} 0px 2px 8px 0px` }
          : null),
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <img src={props.info.imageUrl} style={cardStyle.image} />
      {hover ? (
        <span
          onClick={() => props.onSetSelected(props.info)}
          style={cardStyle.addBtn}
        >
         {props.removeAble ?  'X' : 'Add'} 
        </span>
      ) : null}
      <div style={cardStyle.infomation}>
        <span style={cardStyle.title}>{props.info.name}</span>
        <div>
          <div style={cardStyle.row}>
            <span style={cardStyle.label}>HP:</span>{" "}
            {progressBar(hpCalculation(+props.info.hp))}
          </div>
          <div style={cardStyle.row}>
            <span style={cardStyle.label}>STR:</span>{" "}
            {progressBar(strengthCalculation(props.info.attacks))}
          </div>
          <div style={cardStyle.row}>
            <span style={cardStyle.label}>WEAK:</span>{" "}
            {progressBar(weaknessesCalculation(props.info.weaknesses))}
          </div>
          <div style={cardStyle.row}>
            {Array.from(
              {
                length: happinessLevelCalculation(
                  hpCalculation(+props.info.hp),
                  damageCalculation(props.info.attacks),
                  weaknessesCalculation(props.info.weaknesses)
                ),
              },
              (_, i) => (
                <div key={i} style={cardStyle.happiness} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPokedex;
