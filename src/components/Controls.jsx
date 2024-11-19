import React from "react";
import { useState, useEffect } from "react";
import Button from "..components/Button";
import Upgrade from "..components/upgrades";

const Controls = ({ buyTopping, buyJarUpgrade }) => {
  return (
    <div className="controls">
      <Button Onclick={buyUpgrade} />
      <Button Onclick={buyjarUpgrade} />
    </div>
  );
};

export default Controls;
