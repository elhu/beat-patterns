import React from "react";
import { FunctionComponent } from "react";

interface IProps {
  onClick: () => void,
  color?: string
}

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
