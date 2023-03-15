import React, { useReducer } from "react";
import "./App.css";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DEL_DIGIT: "del-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};
export const { ADD_DIGIT, DEL_DIGIT, CLEAR, CHOOSE_OPERATION, EVALUATE } =
  ACTIONS;
const reducer = (state, { type, payload }) => {
  const { currentOperand, previousOperand, operation, overWrite } = state;
  switch (type) {
    case ADD_DIGIT:
      if (payload.digit === "0" && currentOperand === "0") return state;
      if (payload.digit === "." && currentOperand.includes(".")) return state;
      if (overWrite)
        return {
          ...state,
          currentOperand: payload.digit,
          overWrite: false,
        };
      return {
        ...state,
        currentOperand: `${currentOperand || ""}${payload.digit}`,
      };
    case CLEAR:
      return {};
    case CHOOSE_OPERATION:
      if (currentOperand == null && previousOperand == null) return state;
      if (currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case EVALUATE:
      if (
        operation == null ||
        currentOperand == null ||
        previousOperand == null
      )
        return state;
      return {
        ...state,
        overWrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    case DEL_DIGIT:
      if (overWrite)
        return {
          ...state,
          overWrite: false,
          currentOperand: null,
        };
      if (currentOperand == null) return state;
      if (currentOperand.length === 1)
        return {
          ...state,
          currentOperand: null,
        };
      return {
        ...state,
        currentOperand: currentOperand.slice(0, -1),
      };
    default:
      return state;
  }
};

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const cur = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(cur)) return "";
  let computedVal = "";
  switch (operation) {
    case "+":
      computedVal = prev + cur;
      break;
    case "-":
      computedVal = prev - cur;
      break;
    case "/":
      computedVal = prev / cur;
      break;
    case "*":
      computedVal = prev * cur;
      break;
  }
  return computedVal.toString();
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-in", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  const buttonArr = [
    "AC",
    "Del",
    "/",
    "1",
    "2",
    "3",
    "*",
    "4",
    "5",
    "6",
    "+",
    "7",
    "8",
    "9",
    "-",
    ".",
    "0",
    "=",
  ];
  const digitArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      {buttonArr.map((val) => {
        return digitArr.includes(val) ? (
          <DigitButton digit={val} dispatch={dispatch} />
        ) : (
          <OperationButton operation={val} dispatch={dispatch} />
        );
      })}
    </div>
  );
};

export default App;
