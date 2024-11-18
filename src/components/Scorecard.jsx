import React from "react";
const Scorecard = ({ cookies, cps, jarsize, toppings }) => {
  return (
    <div className="scorecard">
      <p>Cookies: {cookies} </p>
      <p>Cookies per second: {cps} </p>
      <p>Jar Size: {jarsize} </p>
      <p>Toppings: {toppings}</p>
    </div>
  );
};
export default Scorecard;
