import React from 'react';
import "./styles.scss";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form'
import useVisualMode from 'hooks/useVisualMode';



export default function Appointment(props) {

  const { interview, time, id, interviewers, bookInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(interview ? SHOW: EMPTY);

  const getInterviewerName = (interviewerID) => {
    for (let interviewer of interviewers) {
      if (interviewerID === interviewer.id) {
        return interviewer.name;
      }
    }
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      });
  };

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          interviwerName={getInterviewerName(interview.interviewer)}

        /> 
      )} 
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onCancel={back}
          onSave={save}

        />
      )}
    </article>
  )

}