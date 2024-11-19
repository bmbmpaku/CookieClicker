import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import Upgrade from "./upgrades";

const Controls = ({ buyTopping, buyJarUpgrade }) => {
  return (
    <div className="controls">
      <Button Onclick={buyUpgrade} />
      <Button Onclick={buyjarUpgrade} />
    </div>
  );
};

export default Controls;
