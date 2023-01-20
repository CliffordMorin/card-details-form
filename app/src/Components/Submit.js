import React, { useState } from "react";

const Submit = ({ info, setInfo, setConfirm }) => {
  const [cardNumberError, setCardNumberError] = useState({
    color: "",
    message: "",
  });

  const checkCardNumber = (cardNumber) => {
    const cardNumberRegex = new RegExp("^[0-9]{16}$");
    return cardNumberRegex.test(cardNumber);
  };

  const submitCardNumber = (e) => {
    const cardNumber = e.target.value;
    if (!checkCardNumber(cardNumber)) {
      setCardNumberError({
        color: "red",
        message: "Card number must be 16 digits and numbers only",
      });
    } else {
      setCardNumberError({
        color: "green",
        message: "Card number is valid",
      });
      setInfo({ ...info, cardNumber: cardNumber });
      console.log(info);
    }
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
          onChange={(e) => submitCardNumber(e)}
          required
        />
        {cardNumberError.message && (
          <p style={{ color: cardNumberError.color }}>
            {cardNumberError.message}
          </p>
        )}
        <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
        <input type="text" name="expiryMonth" id="expiryMonth" required />
        <input type="text" name="expiryYear" id="expiryYear" required />
        <label htmlFor="cvc">CVC</label>
        <input type="text" name="cvc" id="cvc" required />
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
};

export default Submit;
