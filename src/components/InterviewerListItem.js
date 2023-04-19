import React from 'react';
import classNames from 'classnames';
import "components/InterviewerListItem.scss";
import { useState } from 'react';

export default function InterviewerListItem(props) {
  
  //const [insterviewer, setInterviewer] = useState(name); 
  const { name, avatar, setInterviewer, selected } = props;
  

  const setClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  return (
    <li className={setClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
       {selected && name}
    </li>
  )
}