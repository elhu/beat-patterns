import React from 'react';
import "./Beat.css";

interface IProps {
  selected?: boolean,
  value: string,
  onClick: () => void,
}

function Beat(props: IProps) {
  return (
    <div className={`beat ${props.selected ? "selected" : ""}`} onClick={props.onClick} >
      {props.value}
    </div>
  );
}

export default Beat;
