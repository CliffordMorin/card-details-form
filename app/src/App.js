import { useState, useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Confirm from "./Components/Confirm";
import Submit from "./Components/Submit";

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("info")) || {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    }
  );

  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StyledApp className="App">
      <img
        src="./images/bg-card-front.png"
        alt="credit card"
        className="creditCardFront"
      />
      {screenWidth < 768 ? (
        <div className="bg-mobile"></div>
      ) : (
        <div className="bg-desktop"></div>
      )}
      {confirm ? (
        <Confirm info={info} setConfirm={setConfirm} />
      ) : (
        <Submit info={info} setInfo={setInfo} setConfirm={setConfirm} />
      )}
    </StyledApp>
  );
}

const StyledApp = styled.div`
  @import url("https://fonts.google.com/specimen/Space+Grotesk");
  font-family: "Space Grotesk";
  font-weight: 500;
  font-size: 18px;
  height: 100vh;

  .bg-mobile {
    background-image: url("./images/bg-main-mobile.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
  }

  .bg-desktop {
    background-image: url("./images/bg-main-desktop.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
  }
`;

export default App;
