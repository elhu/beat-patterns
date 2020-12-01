import React from 'react';

interface IProps {
  selected?: boolean,
  value: string,
  onClick: () => void,
}

function Beat(props: IProps) {
  return (
    <div className={`beat p-2 text-5xl ${props.selected ? "selected" : ""}`} onClick={props.onClick} >
      {props.value}
    </div>
  );
}

export default Beat;
