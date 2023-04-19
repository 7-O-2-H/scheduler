import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {

  const { interviewers, interviewer, setInterviewer } = props;

  const intArray = interviewers.map(int => {
    return (
      <InterviewerListItem
        key={int.id}
        name={int.name}
        avatar={int.avatar}
        selected={int.id === interviewer}
        setInterviewer={setInterviewer}
      />
    )
  })

  return (

    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {intArray}
      </ul>
    </section>

  )
}