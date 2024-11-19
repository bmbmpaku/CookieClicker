import React from "react";
import { useState, useEffect } from "react";

const Controls = ({ buyTopping, buyJarUpgrade }) => {
  return (
    <div className="controls">
      <Button Onclick={buyUpgrade} />
      <Button Onclick={buyjarUpgrade} />
      <Button Onclick={buyToppingUpgrade} />
    </div>
  );
};

export default Controls;
