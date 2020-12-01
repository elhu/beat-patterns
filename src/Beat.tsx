import React from 'react';

interface IProps {
  selected?: boolean,
  value: string,
  onClick: () => void,
}

function Beat(props: IProps) {
  return (
    <div className={`beat p-2 font-semibold rounded-lg shadow-md text-5xl border-2 ${props.selected ? "border-black" : "border-transparent"}`} onClick={props.onClick} >
      {props.value}
    </div>
  );
}

export default Beat;
