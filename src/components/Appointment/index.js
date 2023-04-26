import React from 'react';
import "./styles.scss";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form'
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import useVisualMode from 'hooks/useVisualMode';
import Error from 'components/Appointment/Error';




export default function Appointment(props) {

  const { interview, time, id, interviewers, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(interview ? SHOW: EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  };

  function deleteInterview(id) {
    transition(DELETING);
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err) => transition (ERROR_DELETE, true))
  };

  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=> transition(EDIT)}
        /> 
      )} 
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          interviewer={props.interviewer}
          onCancel={() => back(EMPTY)}
          onSave={save}
          bookInterview={bookInterview}
          name={props.name}
        />
      )}
      {mode === SAVING && (<Status message={'SAVING...'} />)}
      {mode === DELETING && (<Status message={'DELETING...'} />)}
      {mode === CONFIRM && ( 
        <Confirm
        onConfirm={()=> deleteInterview(id)}
        onCancel={back}
        message="Are you sure you want to delete?"
        />
      )}
      {mode === EDIT && (
        <Form 
        interviewers={interviewers}
        onCancel={back}
        onSave={save} 
        name={interview.student}
        interviewer={interview.interviewer}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Saving Error" onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Delete Error" onClose={() => back()} />
      )}
    </article>
  )

}