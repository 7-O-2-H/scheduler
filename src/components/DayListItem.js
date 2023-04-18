import React from 'react';

export default function DayListItem(props) {
  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2>
      <h3 className="test--light">{props.spots} spots remaining</h3>
    </li>
  );
}