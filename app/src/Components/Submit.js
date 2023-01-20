const Submit = (info, setInfo, setConfirm) => {
  const checkCardNumber = (cardNumber) => {
    const cardNumberRegex = new RegExp("^[0-9]{16}$");
    return cardNumberRegex.test(cardNumber);
  };

  return (
    <div>
      <form action="">
        <label htmlFor="cardHolderName">CardHolder Name</label>
        <input type="text" name="cardHolderName" id="cardHolderName" required />
        <label htmlFor="cardNumber">Card Number</label>
        <input type="text" name="cardNumber" id="cardNumber" required />
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
