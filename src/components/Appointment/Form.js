import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {

  const { interviewers, onSave, onCancel} = props;

  const [student, setStudent] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // empties form

  const reset = () => {
    setInterviewer(() => null);
    setStudent(() => "");
  }

  const cancel = () => {
    reset();
    onCancel()
  }

  //validates an edit or submission for appointment confirming a student and interviwer have been selected/input
  
  function validate(student, interviewer) {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            onSubmit={(event) => event.preventDefault()}
            data-testid="student-name-input"
          />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
          form onSubmit={event => event.preventDefault()}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>cancel()}>Cancel</Button>
          <Button confirm onClick={()=> validate(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}