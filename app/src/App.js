import { useState } from "react";
import "./App.css";
import Confirm from "./Components/Confirm";
import Submit from "./Components/Submit";

function App() {
  const [info, setInfo] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [confirm, setConfirm] = useState(false);

  return (
    <div className="App">
      {confirm ? (
        <Confirm info={info} setConfirm={setConfirm} />
      ) : (
        <Submit info={info} setInfo={setInfo} setConfirm={setConfirm} />
      )}
    </div>
  );
}

export default App;
