import React from "react";
import { CHOOSE_OPERATION, CLEAR, DEL_DIGIT, EVALUATE } from "../App";

const OperationButton = ({ dispatch, operation }) => {
  return (
    <button
      className={`${operation === "=" || operation === "AC" ? "span-two" : ""}`}
      onClick={() =>
        dispatch({
          type:
            operation === "Del"
              ? DEL_DIGIT
              : operation === "="
              ? EVALUATE
              : operation === "AC"
              ? CLEAR
              : CHOOSE_OPERATION,
          payload: { operation },
        })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
