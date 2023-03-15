import React from "react";
import { ADD_DIGIT } from "../App";

const DigitButton = ({ dispatch, digit }) => {
  return (
    <button onClick={() => dispatch({ type: ADD_DIGIT, payload: { digit } })}>
      {digit}
    </button>
  );
};

export default DigitButton;
