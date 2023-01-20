import React, { useState } from "react";

const Submit = ({ info, setInfo, setConfirm }) => {
  const [cardNumberError, setCardNumberError] = useState({
    color: "",
    message: "",
  });

  const [inputBlank, setInputBlank] = useState({
    color: "",
    message: "",
  });

  const [submitValid, setSubmitValid] = useState(false);

  const checkCardNumber = (cardNumber) => {
    const cardNumberRegex = new RegExp("^[0-9]{16}$");
    return cardNumberRegex.test(cardNumber);
  };

  const isInputBlank = (input) => {
    const inputRegex = new RegExp("^[a-zA-Z0-9]{1,}$");
    return inputRegex.test(input);
  };

  const submitIsInputBlank = (e) => {
    const input = e.target.value;
    if (!isInputBlank(input)) {
      setInputBlank({
        color: "red",
        message: "Can't be blank",
      });
    } else {
      setInputBlank({
        color: "green",
        message: "",
      });
    }
  };

  const submitCardNumber = (e) => {
    const cardNumber = e.target.value;
    if (!checkCardNumber(cardNumber)) {
      setCardNumberError({
        color: "red",
        message: "Wrong format, numbers only",
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

  const checkFormValidity = () => {
    setSubmitValid(
      [info.cardHolderName, info.cardNumber, info.expiryDate, info.cvv].every(
        (input) => input.trim().length > 0
      )
    );
  };

  const setExpiryDate = (e) => {
    setInfo({
      ...info,
      expiryDate: e.target.expiryMonth.value + "/" + e.target.expiryYear.value,
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (checkFormValidity()) {
      alert("Please fill in all fields");
    } else {
      setInfo({
        cardHolderName: e.target.cardHolderName.value,
        cardNumber: e.target.cardNumber.value,
        expiryDate:
          e.target.expiryMonth.value + "/" + e.target.expiryYear.value,
        cvv: e.target.cvv.value,
      });
      setConfirm(true);
    }
  };

  return (
    <div>
      <form action="">
        <label htmlFor="cardHolderName">CardHolder Name</label>
        <input
          type="text"
          name="cardHolderName"
          id="cardHolderName"
          style={{ borderColor: inputBlank.color }}
          onChange={(e) => {
            submitIsInputBlank(e);
            setInfo(info.cardHolderName);
          }}
          required
        />
        {inputBlank.message && (
          <p style={{ color: inputBlank.color }}>{inputBlank.message}</p>
        )}
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
          style={{ borderColor: cardNumberError.color }}
          onChange={(e) => submitCardNumber(e)}
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
          style={{ borderColor: inputBlank.color }}
          onChange={(e) => {
            submitIsInputBlank(e);
            setExpiryDate(e);
          }}
          required
        />
        {inputBlank.message && (
          <p style={{ color: inputBlank.color }}>{inputBlank.message}</p>
        )}
        <input
          type="text"
          name="expiryYear"
          id="expiryYear"
          maxLength="2"
          placeholder="YY"
          style={{ borderColor: inputBlank.color }}
          onChange={(e) => {
            submitIsInputBlank(e);
            setExpiryDate(e);
          }}
          required
        />
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          name="cvv"
          id="cvv"
          maxLength="3"
          placeholder="e.g. 123"
          style={{ borderColor: inputBlank.color }}
          onChange={(e) => {
            submitIsInputBlank(e);
            setInfo(info.cvv);
          }}
          required
        />
        {inputBlank.message && (
          <p style={{ color: inputBlank.color }}>{inputBlank.message}</p>
        )}
        <button
          type="submit"
          onSubmit={(e) => formSubmit(e)}
          disabled={!submitValid}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Submit;
