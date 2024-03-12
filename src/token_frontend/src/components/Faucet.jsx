import React, { useState } from "react";
import { token_backend } from "../../../declarations/token_backend";

function Faucet() {

  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Gimme Gimme");

  async function handleClick(event) {
    setDisable(true);
    const result = await token_backend.payOut();
    setText(result);
    // setDisable(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DElina tokens here! Claim 10,000 DELI tokens to your account.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled} 
        >
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
