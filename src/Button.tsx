import React from "react";
import { FunctionComponent } from "react";

interface IProps {
  onClick: () => void,
  color?: string
}

// Magic comment to prevent colors from being purged during tree shaking
// [
//   "bg-green-500",
//   "bg-blue-500",
//   "bg-green-700",
//   "bg-blue-700",
// ]
const Button: FunctionComponent<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <button className={`m-1 py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-${props.color}-500 hover:bg-${props.color}-700`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  color: "green"
}

export default Button;
