import React from 'react';
import "./styles.scss";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form'
import useVisualMode from 'hooks/useVisualMode';



export default function Appointment(props) {

  const { interview, time, id, } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW: EMPTY);
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          

        /> 
      )} 
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={[]}
          onCancel={back}
        />
      )}
    </article>
  )

}