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
      <form onSubmit={formSubmit}>
        <label htmlFor="cardHolderName">CARDHOLDER NAME</label>
        <input
          type="text"
          name="cardHolderName"
          id="cardHolderName"
          minLength="3"
          placeholder="e.g. Jane Appleseed"
          required
        />
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
            }}
          >
            {cardNumberError.message}
          </p>
        )}
        <label htmlFor="expiryDate">EXP. DATE (MM/YY)</label>
        <input
          type="text"
          name="expiryMonth"
          id="expiryMonth"
          maxLength="2"
          minLength="2"
          placeholder="MM"
          required
        />
        <input
          type="text"
          name="expiryYear"
          id="expiryYear"
          maxLength="2"
          minLength="2"
          placeholder="YY"
          required
        />
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

        <button type="submit">Confirm</button>
      </form>
    </StyledSubmit>
  );
};

const StyledSubmit = styled("div")`
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
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

export default Submit;
