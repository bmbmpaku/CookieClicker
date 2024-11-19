// Upgrades
import React from "react";
import PropTypes from "prop-types";

const APIUpgrades = ({ upgrade, buyUpgrade }) => {
  return (
    <div className="upgrade">
      <p>
        {upgrade.name} - {upgrade.cost} cookies - Gives {upgrade.increase} CPS
      </p>
      <button onClick={() => buyUpgrade(upgrade)}>Buy</button>
    </div>
  );
};

export default Upgrade;
