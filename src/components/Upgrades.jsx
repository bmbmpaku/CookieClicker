// Upgrades
import React from "react";
import PropTypes from "prop-types";

const Upgrade = ({ upgrade, buyUpgrade }) => {
  return (
    <div className="upgrade">
      <p>
        {upgrade.name}
        <p>{upgrade.cost} cookies</p>
        <p>- Gives {upgrade.increase} CPS</p>
      </p>
      <button onClick={() => buyUpgrade(upgrade)}>Buy</button>
    </div>
  );
};

export default Upgrade;
