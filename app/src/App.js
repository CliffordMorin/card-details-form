import { useState, useEffect } from "react";
import styled from "styled-components";
import Submit from "./Components/Submit";
import Confirm from "./Components/Confirm";

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("info")) || {
      cardHolderName: "Jane Appleseed",
      cardNumber: "0000000000000000",
      expiryDate: "00/00",
      cvv: "000",
    }
  );

  const [confirm, setConfirm] = useState(false);

  const formatCardNumber = (cardNumber) => {
    return cardNumber.replace(/\d{4}(?=\d{4})/g, "$& ");
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    console.log(info.cardNumber);
    return () => window.removeEventListener("resize", handleResize);
  }, [info.cardNumber]);

  return (
    <StyledApp className="App">
      <CreditFrontContainer className="frontContainer">
        <img
          src={`${process.env.PUBLIC_URL}/images/bg-card-front.png`}
          alt="credit card"
          className="creditCardFront"
        />
        <svg></svg>
        <StyledCardNumber>{formatCardNumber(info.cardNumber)}</StyledCardNumber>
        <StyledName>{info.cardHolderName.toUpperCase()}</StyledName>
        <StyledExpiryDate>{info.expiryDate}</StyledExpiryDate>
      </CreditFrontContainer>
      <CreditBackContainer>
        <img
          src={`${process.env.PUBLIC_URL}/images/bg-card-back.png`}
          alt="credit card"
          className="creditCardBack"
        />
        <StyledCvv>{info.cvv}</StyledCvv>
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
  @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap");
  font-family: "Space Grotesk";
  font-weight: 500;
  font-size: 18px;
  height: 100vh;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  .creditCardFront {
    position: absolute;
    width: 30%;
    height: 32vh;
    z-index: 0;
    top: 15vh;
    transform: translate(30%, 0);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    border-radius: 8px;

    @media (max-width: 768px) {
      width: 75%;
      height: 20vh;
      transform: translate(10%, 15%);
      z-index: 2;
    }
  }

  .creditCardBack {
    position: absolute;
    width: 30%;
    height: 32vh;
    z-index: 2;
    transform: translate(50%, 170%);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    @media (max-width: 768px) {
      width: 75%;
      height: 20vh;
      transform: translate(25%, 30%);
      z-index: 1;
    }
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
    height: 30vh;
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
  svg {
    position: absolute;
    background-image: url("${process.env.PUBLIC_URL}/images/card-logo.svg");
    background-repeat: no-repeat;
    top: 18vh;
    left: 11%;
    width: 20%;
    height: 20%;
    z-index: 5;
    @media (max-width: 768px) {
      top: 20vh;
      left: 10%;
    }
  }
`;

const CreditBackContainer = styled.div``;

const StyledCvv = styled.p`
  position: absolute;
  color: #fff;
  top: 60vh;
  left: 38vw;
  transform: translate(79%, 60px);
  width: 2%;
  height: 3%;
  margin: 0;
  z-index: 5;
  font-size: 1.2rem;
  @media (max-width: 768px) {
    transform: translate(86%, 90%);
    left: 70%;
    width: 10%;
    top: 12vh;
    font-size: 1rem;
  }
`;

const StyledCardNumber = styled.p`
  position: absolute;
  color: #fff;
  top: 29vh;
  left: 12%;
  width: 25%;
  height: 5%;
  margin: 0;
  z-index: 5;
  font-size: 2.5rem;
  @media (max-width: 768px) {
    transform: translate(1%, -15%);
    width: 80%;
    font-size: 1.6rem;
  }
`;

const StyledName = styled.p`
  position: absolute;
  color: #fff;
  top: 32vh;
  left: 11vw;
  transform: translate(0px, 65px);
  width: 10%;
  height: 5%;
  margin: 0;
  z-index: 5;
  font-size: 1rem;
  @media (max-width: 768px) {
    transform: translate(0%, 40%);
    width: 80%;
    font-size: 0.8rem;
  }
`;

const StyledExpiryDate = styled.p`
  position: absolute;
  color: #fff;
  top: 32vh;
  left: 35vw;
  transform: translate(0px, 65px);
  width: 3%;
  height: 5%;
  margin: 0;
  z-index: 5;
  font-size: 1rem;
  @media (max-width: 768px) {
    transform: translate(85%, 40%);
    width: 10%;
    font-size: 0.8rem;
    left: 60%;
  }
`;

export default App;
