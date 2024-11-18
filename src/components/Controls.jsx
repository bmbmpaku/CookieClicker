import React from "react";
import { useState, useEffect } from "react";
import Upgrade from "./upgrades";

const Controls = ({ buyTopping, buyJarUpgrade }) => {
  return (
    <div className="controls">
      <Button Onclick={incrementCookies} />
      <Button Onclick={buyUpgrade} />
      <Button Onclick={buyjarUpgrade} />
    </div>
  );
};

export default Controls;
