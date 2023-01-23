import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import Confirm from "./Components/Confirm";
import Submit from "./Components/Submit";

function App() {
  const [info, setInfo] = useState(
    JSON.parse(localStorage.getItem("info")) || {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    }
  );

  const [confirm, setConfirm] = useState(false);

  return (
    <StyledApp className="App">
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export default App;
