import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Submit = ({ info, setInfo, setConfirm }) => {
  useEffect(() => {
    localStorage.setItem("info", JSON.stringify(info));
  }, [info]);

  const [cardNumberError, setCardNumberError] = useState({
    color: "",
    message: "",
  });

  // const [inputBlank, setInputBlank] = useState({
  //   color: "",
  //   message: "",
  // });

  const checkCardNumber = (cardNumber) => {
    const cardNumberRegex = new RegExp("^[0-9]{16}$");
    return cardNumberRegex.test(cardNumber);
  };

  // const isInputBlank = (input) => {
  //   const inputRegex = new RegExp("^[a-zA-Z0-9]{1,}$");
  //   return inputRegex.test(input);
  // };

  // const submitIsInputBlank = (e) => {
  //   const input = e.target.value;
  //   if (!isInputBlank(input)) {
  //     setInputBlank({
  //       color: "red",
  //       message: "Can't be blank",
  //     });
  //   } else {
  //     setInputBlank({
  //       color: "green",
  //       message: "",
  //     });
  //   }
  // };

  const testCardNumber = (e) => {
    const cardNumber = e.target.value;
    if (!checkCardNumber(cardNumber)) {
      setCardNumberError({
        color: "red",
        message: "Wrong format, numbers only and 16 digits",
      });
    } else {
      setCardNumberError({
        color: "green",
        message: "Card number is valid",
      });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const input = {
      cardHolderName: e.target.cardHolderName.value,
      cardNumber: e.target.cardNumber.value,
      expiryDate: e.target.expiryMonth.value + "/" + e.target.expiryYear.value,
      cvv: e.target.cvv.value,
    };
    localStorage.setItem("info", JSON.stringify(input));
    setInfo(input);
    setConfirm(true);
  };

  return (
    <StyledSubmit>
      <StyledForm onSubmit={formSubmit}>
        <div className="cardHolderName">
          <label htmlFor="cardHolderName">CARDHOLDER NAME</label>
          <input
            type="text"
            name="cardHolderName"
            id="cardHolderName"
            minLength="3"
            placeholder="e.g. Jane Appleseed"
            required
          />
        </div>
        <div className="cardNumber">
          <label htmlFor="cardNumber">CARD NUMBER</label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            placeholder="e.g 1234 5678 9012 3456"
            style={{ borderColor: cardNumberError.color }}
            onChange={(e) => {
              testCardNumber(e);
            }}
            maxLength="16"
            required
          />
          {cardNumberError.message && (
            <p
              style={{
                color: cardNumberError.color,
                margin: "0",
                position: "absolute",
              }}
            >
              {cardNumberError.message}
            </p>
          )}
        </div>
        <div className="expiryMonth">
          <label htmlFor="expiryMonth">EXP. DATE</label>
          <input
            type="text"
            name="expiryMonth"
            id="expiryMonth"
            maxLength="2"
            minLength="2"
            placeholder="MM"
            required
          />
        </div>
        <div className="expiryYear">
          <label htmlFor="expiryYear">(MM/YY)</label>
          <input
            type="text"
            name="expiryYear"
            id="expiryYear"
            maxLength="2"
            minLength="2"
            placeholder="YY"
            required
          />
        </div>
        <div className="cvv">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            name="cvv"
            id="cvv"
            maxLength="3"
            minLength="3"
            placeholder="e.g. 123"
            required
          />
        </div>

        <StyledSubmitButton type="submit">Confirm</StyledSubmitButton>
      </StyledForm>
    </StyledSubmit>
  );
};

const StyledSubmit = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  margin: 0 auto;
  transform: translateX(50%);

  @media (max-width: 768px) {
    width: 80%;
    transform: translate(0, -12%);
    align-items: flex-end;
  }
`;

const StyledForm = styled("form")`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 25% 25% 50%;
  grid-gap: 20px 10px;
  z-index: 2;

  .cardHolderName {
    grid-row: 1 / 2;
    grid-column: 1 / 4;
  }

  .cardNumber {
    grid-row: 2 / 3;
    grid-column: 1 / 4;
  }

  .expiryMonth {
    grid-row: 3 / 4;
    grid-column: 1 / 2;
  }
  .expiryYear {
    grid-row: 3 / 4;
    grid-column: 2 / 3;
    margin-right: 10px;
  }
  .cvv {
    grid-row: 3 / 4;
    grid-column: 3 / 4;
  }
  label {
    float: left;
  }
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  input:invalid {
    border: 1px solid hsl(0, 100%, 66%);
  }

  input:focus {
    border: 1px solid hsl(249, 99%, 64%) to hsl(278, 94%, 30%);
  }
  input:valid {
    border: 1px solid green;
  }
`;

const StyledSubmitButton = styled("button")`
  grid-row: 4 / 5;
  grid-column: 1 / 4;
  background-color: #210a2f;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 8px;
`;

export default Submit;
