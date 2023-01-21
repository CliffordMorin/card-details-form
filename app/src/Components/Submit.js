import React, { useState } from "react";

const Submit = ({ info, setInfo, setConfirm }) => {
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
    setInfo({
      cardHolderName: e.target.cardHolderName.value,
      cardNumber: e.target.cardNumber.value,
      expiryDate: e.target.expiryMonth.value + "/" + e.target.expiryYear.value,
      cvv: e.target.cvv.value,
    });
    setConfirm(true);
    console.log(info);
  };

  return (
    <div>
      <form action="">
        <label htmlFor="cardHolderName">CardHolder Name</label>
        <input type="text" name="cardHolderName" id="cardHolderName" required />

        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
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
        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
        <input
          type="text"
          name="expiryMonth"
          id="expiryMonth"
          maxLength="2"
          placeholder="MM"
          required
        />

        <input
          type="text"
          name="expiryYear"
          id="expiryYear"
          maxLength="2"
          placeholder="YY"
          required
        />
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          name="cvv"
          id="cvv"
          maxLength="3"
          placeholder="e.g. 123"
          required
        />

        <button type="submit" onSubmit={formSubmit}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Submit;
