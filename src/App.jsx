import Button from "./components/Button";
import Controls from "./components/Controls";
import Header from "./components/Header";
import Scorecard from "./components/Scorecard";
import { useState, useEffect } from "react";
import GCButton from "./components/GCButton";
import "./app.css";
import Upgrade from "./components/Upgrades";

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [upgrades, setUpgrades] = useState([]);
  const [jarsize, setJarsize] = useState(500);
  const [toppings, setToppings] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  //Fetch Upgardes from API
  useEffect(() => {
    const fetchUpgrades = async () => {
      try {
        const response = await fetch(
          "https://cookie-upgrade-api.vercel.app/api/upgrades"
        );
        const data = await response.json();
        setUpgrades(data);
      } catch (error) {
        console.error("Error fetch upgrades", error);
      }
    };
    fetchUpgrades();
  }, []);

  //Handle CPS
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setCookies((prevCookies) => prevCookies + cps);
    }, 1000);
    return () => clearInterval(interval);
  }, [cps, gameStarted]);

  //Handle Game Over
  useEffect(() => {
    if (cookies >= jarsize) {
      alert("You broke the cookie Jar");
      resetGame();
    }
  }, [cookies, jarsize]);

  // Load State from local Storage
  useEffect(() => {
    const savedCookies = parseInt(localStorage.getItem("cookies")) || 0;
    const savedCps = parseInt(localStorage.getItem("cps")) || 1;
    const savedJarsize = parseInt(localStorage.getItem("jarsize")) || 200;
    const savedToppings = parseInt(localStorage.getItem("toppings")) || 0;
    setCookies(savedCookies);
    setCps(savedCps);
    setJarsize(savedJarsize);
    setToppings(savedToppings);
  }, []);

  //Save State to local storage
  useEffect(() => {
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("cps", cps);
    localStorage.setItem("jarsize", jarsize);
    localStorage.setItem("toppings", toppings);
  }, [cookies, cps, jarsize, toppings]);

  const incrementCookies = () => {
    setCookies((prevCookies) => prevCookies + 1);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setCookies(0);
    setCps(1);
    setJarsize(200);
    setToppings(0);
    setGameStarted(false);
  };

  const buyUpgrade = (upgrade) => {
    if (cookies >= upgrade.cost) {
      setCookies(cookies - upgrade.cost);
      setCps(cps + upgrade.increase);
      setToppings(toppings + 1);
    } else {
      alert("Not enough cookies!");
    }
  };
  //Define toppings and jar upgrade
  const toppingsList = [
    { id: 1, name: "Chocolate Chip", cost: 10, cpsBoost: 5 },
    { id: 2, name: "Skittles", cost: 10, cpsBoost: 4 },
    { id: 3, name: "Biscoff", cost: 10, cpsBoost: 3 },
    { id: 4, name: "Magic Flour", cost: 100, cpsBoost: 100 },
  ];

  const jarUpgrade = {
    id: 5,
    name: "Double Jar",
    cost: 50,
    sizeBy: 2,
    bonus: 1.2,
  };

  const buyTopping = (topping) => {
    if (cookies >= topping.cost) {
      setCookies(cookies - topping.cost);
      setCps(cps + topping.cpsBoost);
      setToppings(toppings + 1);
    } else {
      alert("Not enough cookies!");
    }
  };
  const buyJarUpgradeFunc = () => {
    if (toppings >= jarUpgrade.cost) {
      setJarsize(jarsize * jarUpgrade.sizeBy);
      setToppings(toppings - jarUpgrade.cost);
      setCookies(Math.floor(cookies * jarUpgrade.bonus));
    } else {
      alert("Buy more toppings to unlock larger jars");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? "dark-theme" : "light-theme"}`}>
      <Header />
      <button onClick={toggleDarkMode}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
      <div className="Instructions">
        <p>This Game is simple</p>
        <p className="howtoplay">How to play</p>
      </div>
      <Scorecard
        cookies={cookies}
        cps={cps}
        jarsize={jarsize}
        toppings={toppings}
      />
      <GCButton onClick={incrementCookies} />
      {!gameStarted && <button onClick={startGame}>Start Game</button>}
      <div className="upgrades">
        {upgrades.map((upgrade) => (
          <Upgrade key={upgrade.id} upgrade={upgrade} buyUpgrade={buyUpgrade} />
        ))}
        <div className="toppings-upgrades">
          {toppingsList.map((topping) => (
            <div key={topping.id} className="topping">
              <p>
                {topping.name} - {topping.cost} cookies - +{topping.cpsBoost}{" "}
                CPS
              </p>
              <button onClick={() => buyTopping(topping)}>Buy</button>
            </div>
          ))}
          <div className="jar-upgrade">
            <p>
              {jarUpgrade.name} - {jarUpgrade.cost} toppings - Doubles jar size
            </p>
            <button onClick={buyJarUpgradeFunc}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
}
