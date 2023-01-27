import { useState, useEffect } from "react";
import styled from "styled-components";
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
      <CreditFrontContainer className="frontContainer">
        <img
          src={`${process.env.PUBLIC_URL}/images/bg-card-front.png`}
          alt="credit card"
          className="creditCardFront"
        />
      </CreditFrontContainer>
      <CreditBackContainer>
        <img
          src={`${process.env.PUBLIC_URL}/images/bg-card-back.png`}
          alt="credit card"
          className="creditCardBack"
        />
      </CreditBackContainer>

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

  .creditCardFront {
    position: absolute;
    width: 30%;
    height: 32vh;
    z-index: 0;
    top: 20vh;
  }

  .creditCardBack {
    position: absolute;
    width: 30%;
    height: 32vh;
    z-index: 2;
  }

  .bg-mobile {
    background-image: url("${process.env
      .PUBLIC_URL}/images/bg-main-mobile.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 20vh;
    z-index: -1;
  }

  .bg-desktop {
    background-image: url("${process.env
      .PUBLIC_URL}/images/bg-main-desktop.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left;
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 100vh;
    z-index: -1;
  }
`;

const CreditFrontContainer = styled.div`
  margin-left: 10%;
`;

const CreditBackContainer = styled.div``;

export default App;
